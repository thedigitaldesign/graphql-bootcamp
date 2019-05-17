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
        inStock: Boolean!
        quantity: Int!
        reviews: [Review]
    }

    type Review {
        id: ID!
        ProductId: ID!
        title: String!
        comment: String
        date: String!
        rating: Float!
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
                    inStock: () => {
                        return false
                    },
                    quantity: () => {
                        return 0
                    },
                    reviews: () => {

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
                    inStock: () => {
                        return true
                    },
                    quantity: () => {
                        return 6
                    },
                    reviews: () => {
                        return [
                            {
                               id: uuidv4(),
                               ProductId: uuidv4(),
                               title: 'Best Book EVER!',
                               comment: 'See title obviously!',
                               date: new Date(),
                               rating: 4
                            }
                        ]
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
