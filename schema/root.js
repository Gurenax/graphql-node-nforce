const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
  // GraphQLNonNull
} = require('graphql')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query type',
  fields: () => {
    return {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello World!'
      }
    }
  }
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType
  // mutation: RootMutationType
})

module.exports = rootSchema