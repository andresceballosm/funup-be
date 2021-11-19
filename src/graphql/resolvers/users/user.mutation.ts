import { FeedPreferences } from '../../../models/feed-preferences.model';
import { SmallTeam } from '../../../models/small-team';
import { Socials } from '../../../models/socials.model';
import { squadModel } from '../../../models/squad.model';
import { FollowedUser, UserDocument, userModel } from '../../../models/user.model';
const imageUpload = require('../../../lib/image-upload');

interface OnboardingInput {
  feedPreferences: FeedPreferences;
  teams: SmallTeam[];
  email: string;
}

interface SocialInput {
  socials: Socials,
  firebaseUid: string,
}

interface UserProfileInput {
  firebaseUid: string
  name: string
  email: string
  bio: string
  socials: Socials
  photo: string
  banner: string
  userPhoto: string
  bannerPhoto: string
  feedPreferences: FeedPreferences
  teams: [SmallTeam]
}
interface TeamInput {
  teams: SmallTeam[]
  firebaseUid: string
}

interface FollowedUsersInput {
  firebaseUid: string
  followedUsers: FollowedUser[]
}

export default {
  signup: async (_1: any, context: UserDocument) => await userModel.create(context),

  updateProfile: async (_1: any, context: UserProfileInput) => {
    const user = {
      firebaseUid: context.firebaseUid,
      name: context.name,
      email: context.email,
      bio: context.bio,
      socials: context.socials,
      photo: await imageUpload(context.userPhoto),
      banner: await imageUpload(context.bannerPhoto),
      feedPreferences: context.feedPreferences,
      teams: context.teams
    };

    await squadModel.updateMany(
      { 'members.firebaseUid': user.firebaseUid },
      { $set: {
        'members.$.name': context.name,
        'members.$.firebaseUid': context.firebaseUid,
        'members.$.photo': context.photo }
      }
    );

    return await userModel.findOneAndUpdate(
      { firebaseUid: user.firebaseUid },
      { ...user, onboardingCompleted: true },
      { returnOriginal: false }
    );
  },

  updateSocialMedia: async (_1: any, context: SocialInput) => {
    const { firebaseUid, socials } = context;
    return await userModel.findOneAndUpdate(
      { firebaseUid },
      { socials },
      { returnOriginal: false }
    )
  },

  updateTeams: async (_1: any, context: TeamInput) => {
    const { firebaseUid, teams } = context;
    return await userModel.findOneAndUpdate(
      { firebaseUid },
      { teams },
      { returnOriginal: false }
    )
  },

  updateFollowedUsers: async (_1: any, context: FollowedUsersInput) => {
    const { firebaseUid, followedUsers } = context;
    return await userModel.findOneAndUpdate(
      { firebaseUid },
      { followedUsers },
      { returnOriginal: false }
    )
  },

  onboarding: async (_1: any, args: OnboardingInput) => {
    const { feedPreferences, teams, email } = args;
    return await userModel.findOneAndUpdate(
      { email },
      { feedPreferences, teams },
      { returnOriginal: false }
    );
  },
};
