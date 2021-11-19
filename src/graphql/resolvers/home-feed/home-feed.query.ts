import { UserInputError } from 'apollo-server-errors';
import { getDatabase } from '../../../db';
import { tweetParser } from '../../../lib/sportsmanias/tweet-parser';
import { TweetDocument } from '../../../models/tweet.model';

type HomeFeedProps = {
  cursor: string;
  firebaseUid: string;
  limit: number;
};

export default {
  homeFeed: async (_: any, { cursor, firebaseUid, limit }: HomeFeedProps) => {
    if (!cursor) {
      cursor = new Date().getTime().toString();
    }

    const user = await getDatabase().userModel.findOne({ firebaseUid });
    if (!user) {
      throw new UserInputError(`Invalid firebaseUid: ${firebaseUid}`);
    }

    const userTeams = user.teams.map((t) => t.name);
    limit = limit ?? 10;

    let tweets: TweetDocument[] = [];
    const dateCursor = new Date(Number.parseInt(cursor));
    let newCursor: string = cursor;

    if (user.feedPreferences.tweets) {
      tweets = await getDatabase()
        .tweetModel.find({
          'classificationWithLeague.team': { $in: userTeams },
          'created_at': { $lt: dateCursor },
        })
        .sort({ created_at: -1 })
        .limit(limit);

      const lastTweet = tweets[tweets.length - 1];
      if (lastTweet) {
        newCursor = lastTweet.created_at.getTime().toString();
      }
    }

    const feed = {
      tweets: tweetParser(tweets, user.teams),
      cursor: newCursor,
    };

    return feed;
  },
};
