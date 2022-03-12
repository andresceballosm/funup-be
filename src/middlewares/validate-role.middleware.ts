const { response, request } = require('express');

export const isAdminRole = (req = request, res = response, next: any) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero',
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not admin`,
    });
  }

  next();
};

export const hasRole = (...roles: any) => {
  return (req = request, res = response, next: any) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `You do not have role for this action ${roles}`,
      });
    }

    next();
  };
};
