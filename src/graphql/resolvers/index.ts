import userResolvers from './users/index';
import leagueResolvers from './leagues/index';
import squadResolvers from './squads/index';
import homeFeedResolvers from './home-feed/index';

import _ from 'lodash';

export default _.merge({}, userResolvers, leagueResolvers, squadResolvers, homeFeedResolvers);
