const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
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
          return salesforce.query(`select Id, Name, SLA__c from Account LIMIT 5`)
          // return 'Hello World!'
          // return salesforce.getAllAccounts()
          // return await salesforce.getAllAccounts()
          // return [
          //   {
          //     id: '1',
          //     name: 'hello',
          //     sla__c: 'test'
          //   }
          // ]
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