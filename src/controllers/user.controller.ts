import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';

const UserModel = require('../models/user.model');

export const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { active: true };

  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

export const postUsers = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = new UserModel({ name, email, password, role });

  // Encrypt pasword
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.json({
    user,
  });
};

export const putUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, ...rest } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, rest);

  res.json(user);
};

export const patchUsers = (req: Request, res: Response) => {
  res.json({
    msg: 'patch API - usersPatch',
  });
};

export const deleteUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id, { active: false });
  user.active = false;

  res.json(user);
};
