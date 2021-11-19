import { SmallTeam } from '../../models/small-team';
import { TweetDocument } from '../../models/tweet.model';

export interface SummaryTweet {
  userImage: string;
  id_str: string;
  userName: string;
  team: {
    abbreviation: string | undefined;
    image: string | undefined;
    league: string | undefined;
  };
  text: string;
  mainImage: string | null;
  url: string;
  createdAt: string;
  timestamp: number;
}

export const tweetParser = (
  sportsmaniasTweets: TweetDocument[],
  userTeams: SmallTeam[]
): SummaryTweet[] => {
  return sportsmaniasTweets.map<SummaryTweet>((tweet) => {
    let mainImage = null;

    if (tweet.entities?.media?.length > 0) {
      mainImage = tweet.entities.media[0].media_url_https;
    } else if (tweet.extended_tweet?.entities?.media?.length > 0) {
      mainImage = tweet.extended_tweet.entities.media[0].media_url_https;
    }

    const team = userTeams.find((t) => t.name === tweet.classificationWithLeague.team);

    return {
      id_str: tweet.id_str,
      text: tweet.truncated ? tweet.extended_tweet.full_text : tweet.text,
      userImage: tweet.user.profile_image_url_https,
      userName: tweet.user.screen_name,
      team: {
        abbreviation: team?.abbreviation,
        image: team?.logo,
        league: team?.league,
      },
      timestamp: tweet.created_at.getTime(),
      createdAt: tweet.created_at.toISOString(),
      url: tweet.expanded_url,
      mainImage,
    };
  });
};
