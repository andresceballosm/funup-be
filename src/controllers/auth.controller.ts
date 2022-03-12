import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generate-token.helper';
import { googleVerify } from '../helpers/google-verify.helper';

const User = require('../models/user.model');

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const message = 'Email incorrect.';
      return handleCustomError(res, message, 400);
    }

    if (!user.active) {
      const message = 'User unavailable.';
      return handleCustomError(res, message, 400);
    }

    const validPasswrod = bcryptjs.compareSync(password, user.password);
    if (!validPasswrod) {
      const message = 'Password incorrect.';
      return handleCustomError(res, message, 400);
    }

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      response: {
        user,
        token,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { id_token, role } = req.body;
    console.log('role', role)
    const { name, img, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if(!user) {
      const data = {
        name,
        email,
        password: ':p',
        img,
        role,
        google: true
      };
      user = new User(data);
      await user.save();
    }

    if(!user.active){
      return res.status(401).json({
        ok: false,
        response: { message: `User disabled, please communicate with us.` },
      });
    }

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

function handleCustomError(res: Response, message: string, code: number) {
  return res.status(code).json({
    ok: false,
    response: { message },
  });
}
