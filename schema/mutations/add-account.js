const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')


const AccountType = require('../types/account')

const AccountInputType = require('../inputs/account-input')
// const AccountInputType = new GraphQLInputObjectType({
//   name: 'AccountInput',
//   fields: {
//     name: { type: GraphQLString },
//     sla__c: { type: GraphQLString }
//   }
// })

module.exports = {
  type: AccountType,
  args: {
    input: { type: new GraphQLNonNull(AccountInputType) }
  },
  resolve: (obj, { input }, { salesforce }) => {
    return salesforce.createAccount(input)
  }
}