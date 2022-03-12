import { Router } from 'express';
import { check } from 'express-validator';
// controllers
import { create, get, googleSignIn } from '../controllers/client.controller';
// helpers
import { existEmail } from '../helpers/db-validator.helper';
import { validateFields } from '../middlewares/validate-fields.middleware';

const router = Router();

router.get('/', get);

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check('email', 'Them email isn`t valid').isEmail(),
    check('email').custom(existEmail),
    validateFields,
  ],
  create
);

router.post(
  '/google',
  [
    check('id_token', 'Missing id_token').not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

export default router;
