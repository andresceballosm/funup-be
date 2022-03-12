import { Router } from 'express';
import { check } from 'express-validator';
// middlewares
import { validateFields } from '../middlewares/validate-fields.middleware';
// helpers
import { isValidRole, existEmail, existUserByID } from '../helpers/db-validator.helper';

// controllers
import {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} from '../controllers/user.controller';
import { validateJWT } from '../middlewares/validate-jwt.middleware';
import { hasRole } from '../middlewares/validate-role.middleware';

const router = Router();

router.get('/', getUsers);

router.put(
  '/:id',
  [
    check('id', 'Not is a valid ID').isMongoId(),
    check('id').custom(existUserByID),
    check('rol').custom(isValidRole),
    validateFields,
  ],
  putUsers
);

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check('email', 'Them email isn`t valid').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUsers
);

router.delete('/:id',[
  validateJWT,
  hasRole('ADMIN_ROLE'),
  check('id', 'User uid invalid').isMongoId(),
  check('id').custom( existUserByID ),
  validateFields
],deleteUsers );

router.patch('/', patchUsers);

export default router;
