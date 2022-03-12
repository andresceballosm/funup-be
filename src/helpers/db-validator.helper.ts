const Role = require('../models/role.model');
const User = require('../models/user.model');

export const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({ name: role });
  if (!existRole) {
    throw new Error(`The role ${role} isn't registered in the DB`);
  }
};

export const existRole = async (role = '') => {
  const existRole = await Role.findOne({ name: role });
  if (existRole) {
    throw new Error(`The role ${role} already registered in the DB`);
  }
};

export const existEmail = async (email = '') => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`The email: ${email}, already registered`);
  }
};


export const existUserByID = async (id: string) => {
  const existeUser = await User.findById(id);
  if (!existeUser) {
    throw new Error(`The id not exist ${id}`);
  }
};