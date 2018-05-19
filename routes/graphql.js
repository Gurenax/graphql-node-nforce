const express = require('express')
const graphqlHTTP = require('express-graphql')

const rootSchema = require('../schema/root')

const graphql = (req, res) => {
  graphqlHTTP({
    schema: rootSchema,
    graphiql: true,
    context: {}
  })(req, res)
}

module.exports = graphql