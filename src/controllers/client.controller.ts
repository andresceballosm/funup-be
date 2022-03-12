import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import { CLIENT_ADMIN } from '../constants/user.constants';
import { googleVerify } from '../helpers/google-verify.helper';
import { generateJWT } from '../helpers/generate-token.helper';

const UserModel = require('../models/user.model');
const ClientModel = require('../models/client.model');

export const get = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { active: true };

  const [total, clients] = await Promise.all([
    ClientModel.countDocuments(query),
    ClientModel.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    clients,
  });
};

export const create = async (req: Request, res: Response) => {
  const { name, email, password, company, country} = req.body;
  const role = CLIENT_ADMIN;

  const user = new UserModel({ name, email, password, role });

  // Encrypt pasword
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();
  const manager = {
    id: user.id,
    name,
    email,
    role,
    img: ''
  };
  // Save in DB
  const client = new ClientModel({ managers: [manager], company, country});
  await client.save();

  res.json({
    ok: true,
    response: client,
  });
};


export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;
    const { name, img, email } = await googleVerify(id_token);
    const role = CLIENT_ADMIN;

    let user = await UserModel.findOne({ email });

    if(!user) {
      const data = {
        name,
        email,
        password: ':p',
        img,
        role,
        google: true
      };
      user = new UserModel(data);
      await user.save();
    }

    if(!user.active){
      return res.status(401).json({
        ok: false,
        response: { message: `User disabled, please communicate with us.` },
      });
    }

    const manager = {
      id: user.id,
      email,
      role,
      img: ''
    };

    const client = new ClientModel({name, managers: [manager]});
    await client.save();

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      response: {
        user,
        token
      },
    });
  } catch (error) {
    handleError(res, error)
  }
};

function handleError(res: Response, err: any) {
  return res.status(500).json({
    ok: false,
    response: { message: `${err.code} - ${err.message}` },
  });
}

