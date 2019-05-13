const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

// Schema
const typeDefs = gql`
    type Query {
        hello: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello: () => {
            return 'Hello GraphQL Query!'
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
