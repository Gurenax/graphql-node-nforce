const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query type',
  fields: () => {
    const AccountType = require('./types/account')
    return {
      accounts: {
        type: new GraphQLList( AccountType ),
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccounts()
        }
      },
      accountsById: {
        type: new GraphQLList( AccountType ),
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccountById(args.id) 
        }
      }
    }
  }
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType
  // mutation: RootMutationType
})

module.exports = rootSchema