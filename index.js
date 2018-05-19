'use strict'

// Express
const express = require('express')
const assert = require('assert')

// Initialise express
const server = express()
const PORT = process.env.PORT || 4000

// GraphQL middleware
server.use('/graphql', require('./routes/graphql'))

// Error handler
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Start the server
server.listen(PORT, error => {
  assert.equal(error, null)
  console.log(`GraphQL server started at ${PORT}`)
})