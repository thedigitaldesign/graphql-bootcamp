const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const uuidv4 = require('uuid/v4')

/* 
    Scalar types:
        - String
        - Boolean
        - Int, Float
        - ID (Must be uppercase)
*/

// Schema
const typeDefs = gql`
    type Query {
        me: User!
        products: [Product!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Product {
        id: ID!
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me: () => {
            return {
                id: () => {
                    return uuidv4()
                },
                name: () => {
                    return 'Joshua Christensen'
                },
                email: () => {
                    return 'joshua@thedigitaldesign.com'
                }
            }
        },
        products: () => {
            return [
                {
                    id: () => {
                        return uuidv4()
                    },
                    title: () => {
                        return 'Asus Router'
                    },
                    price: () => {
                        return 46.99
                    },
                    releaseYear: () => {
                        return 1999
                    },
                    rating: () => {
                        return 4
                    },
                    inStock: () => {
                        return false
                    }
                },
                {
                    id: () => {
                        return uuidv4()
                    },
                    title: () => {
                        return 'GraphQL for Zombies'
                    },
                    price: () => {
                        return 46.99
                    },
                    releaseYear: () => {
                        return 2019
                    },
                    rating: () => {
                        return 5
                    },
                    inStock: () => {
                        return true
                    }
                }
            ]
        },
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

server.applyMiddleware({ app })

app.listen({ port: 9000 }, () =>
  console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`)
)
