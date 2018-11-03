const express = require('express')
const bodyParser = require( 'body-parser')
const { ApolloServer } = require('apollo-server-express')
const casual = require('casual')
const schema = require('./schema')

const resolvers = {
    Query: {
        courses: () => {
            return [{
                id: 1,
                title: 'GraphQL',
                description: 'GraphQL Course'
            },
            {
                id: 2,
                title: 'TypeScript',
                description: 'TypeScript Course'
            }]
        }
    },
    Course: {
        professor: () => {
            return {
                name: 'Roger',
                nationality: "Mexican"
            }
        },
        comments: () => {
            return [{
                id: 1,
                name: 'This is a comment',
                body: 'As you can see, this is a hardcoded comment'
            }, {
                id: 2,
                name: 'This is another comment',
                body: 'This is another hardcoded comment'
            }]
        }
    }
}

const mocks = {
    Course: () => ({
        id: casual.uuid,
        title: casual.sentence,
        description: casual.sentences(4)
    }),
    Professor: () => ({
        name: casual.name,
        nationality: casual.country
    })
}

const server = new ApolloServer({
    typeDefs: schema, 
    resolvers,
    mocks
})

const app = express()

server.applyMiddleware({
    app
})

const PORT = 9090
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})