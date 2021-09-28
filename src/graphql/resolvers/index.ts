import queries from './queries'
import mutations from './mutations';

const resolvers: any = {
  Mutation:{
    ...mutations
  },
  Query:{
   ...queries
  }
}

export default resolvers;