import { Router } from 'express';
import { check } from 'express-validator';
import { postRole } from '../controllers/role.controller';
// controllers
import {
  getUsers,
} from '../controllers/user.controller';
import { existRole } from '../helpers/db-validator.helper';
import { validateFields } from '../middlewares/validate-fields.middleware';

const router = Router();

router.get('/', getUsers);

router.post(
    '/',
    [
      check('name', 'The name is required').not().isEmpty(),
      check('name').custom(existRole),
      validateFields
    ],
    postRole
);

export default router;