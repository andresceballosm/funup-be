import userResolvers from './users/index';
import leagueResolvers from './leagues/index';

import _ from 'lodash';

export default _.merge({}, userResolvers, leagueResolvers);
