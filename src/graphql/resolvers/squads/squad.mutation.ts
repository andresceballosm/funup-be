import { squadModel } from '../../../models/squad.model';

interface SmallUserInput {
  firebaseUid: string;
  name: string;
  photo: string;
}
  
interface Member {
  id: string;
  member: SmallUserInput;
}

export default {
  joinSquad: async (_:any, context: Member) => {
    const { id, member } = context;

    return squadModel.findOneAndUpdate(
      { id, 'members.firebaseUid': { $ne: member.firebaseUid } },
      { $addToSet: { members: member }},
      { returnOriginal: false }
    );
  },
  leaveSquad: async (_:any, context: Member) => {
    const { id, member } = context;

    return squadModel.findOneAndUpdate(
      { id },
      { $pull: { members: { firebaseUid: member.firebaseUid } } },
      { returnOriginal: false }
    );
  }
}