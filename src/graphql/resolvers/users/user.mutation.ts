import { FeedPreferences } from '../../../models/feed-preferences.model';
import { SmallTeam } from '../../../models/small-team';
import { Socials } from '../../../models/socials.model';
import { UserDocument, userModel } from '../../../models/user.model';

interface OnboardingInput {
  feedPreferences: FeedPreferences;
  teams: SmallTeam[];
  email: string;
}

interface SocialInput {
  socials: Socials,
  firebaseUid: string,
}

interface TeamInput {
  teams: SmallTeam[];
  firebaseUid: string,
}

export default {
  signup: async (_1: any, context: UserDocument) =>
    await userModel.create(context),

  updateProfile: async (_1: any, context: UserDocument) => {
    return await userModel.findOneAndUpdate(
      context.id,
      { ...context, onboardingCompleted: true },
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

  onboarding: async (_1: any, args: OnboardingInput) => {
    const { feedPreferences, teams, email } = args;
    return await userModel.findOneAndUpdate(
      { email },
      { feedPreferences, teams },
      { returnOriginal: false }
    );
  },
};
