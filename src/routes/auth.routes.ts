import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignIn } from '../controllers/auth.controller';
// middlewares
import { validateFields } from '../middlewares/validate-fields.middleware';

const router = Router();

router.post(
    '/login',
    [
      check('email', 'The email is required').not().isEmpty(),
      check('password', 'The password is required').not().isEmpty(),
      validateFields
    ],
    login
);

router.post(
  '/google',
  [
    check('id_token', 'Missing id_token').not().isEmpty(),
    check('role', 'Missing role').not().isEmpty(),
    validateFields
  ],
  googleSignIn
);

export default router;