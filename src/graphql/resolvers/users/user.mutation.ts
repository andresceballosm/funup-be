import { FeedPreferences } from '../../../models/feed-preferences.model';
import { SmallTeam } from '../../../models/small-team';
import { UserDocument, userModel } from '../../../models/user.model';

interface OnboardingInput {
  feedPreferences: FeedPreferences;
  teams: SmallTeam[];
  email: string;
}

export default {
  signup: async (_1: any, context: UserDocument, _2: any, _3: any) =>
    await userModel.create(context),

  updateProfile: async (_1: any, context: UserDocument, _2: any, _3: any) => {
    return await userModel.findOneAndUpdate(context.id, context, { returnOriginal: false });
  },

  onboarding: async (_1: any, args: OnboardingInput) => {
    const { feedPreferences, teams, email } = args;
    return await userModel.findOneAndUpdate(
      { email },
      { feedPreferences, teams, onboardingCompleted: true },
      { returnOriginal: false }
    );
  },
};
