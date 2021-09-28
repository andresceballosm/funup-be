import { userModel } from '../../../models/user.model';

export default {
  signup: async(_1:any, args:any, _2:any, _3:any) => {
    const newUser = await userModel.create(args);

    return newUser;
  }
}