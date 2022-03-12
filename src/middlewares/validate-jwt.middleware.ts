const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

export const validateJWT = async (req = request, res = response, next: any) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'Missing a token',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    console.log('user', user)
    if (!user) {
      return res.status(401).json({
        msg: 'Token invalid - user not exist in the DB',
      });
    }

    if (!user.active) {
      return res.status(401).json({
        msg: 'Token invalid - user unavailable',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token invalid',
    });
  }
};
