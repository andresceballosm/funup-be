import { UserDocument, userModel } from '../../../models/user.model';

export default {
  signup: async(_1:any, context:UserDocument, _2:any, _3:any) => await userModel.create(context),

  updateProfile: async(_1:any, context:UserDocument, _2:any, _3:any) => {
    return await userModel.findOneAndUpdate(context.id, context, { returnOriginal: false });
  }
}