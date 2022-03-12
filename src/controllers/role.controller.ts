import { Response, Request } from 'express';

const RoleModel = require('../models/role.model');

export const postRole = async (req: Request, res: Response) => {
  const { name } = req.body;
  const role = new RoleModel({ name });

  // Save in DB
  await role.save();

  res.json({
    ok: true,
    response: role,
  });
};
