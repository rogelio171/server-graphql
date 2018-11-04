const express = require('express')
const bodyParser = require( 'body-parser')
const { ApolloServer } = require('apollo-server-express')
const casual = require('casual')
const schema = require('./schema')
const Course = require('./models/Course')
const Professor = require('./models/Professor')
require('./db/setup')

const resolvers = {
    Query: {
        courses: () => Course.query().eager('[professor, comments]'),
        professors: () => Professor.query().eager('courses'),
        course: (rootValue, args) => Course.query().eager('[professor, comments]').findById(args.id),
        professor: (rootValue, args) => Professor.query().eager('courses').findById(args.id)
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
    mocks: false
})

const app = express()

server.applyMiddleware({
    app
})

const PORT = 9090
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})