const { ApolloServer, gql } = require('apollo-server-express')
const Professor = require('./Professor')
const Course =  require('./Course')
const resolvers = require('../resolvers')
const mocks = require('../mocks')

const rootQuery = gql`
    type Query {
        courses: [Course]
        professors: [Professor]
        course(id: Int) : Course
        professor(id:Int): Professor
    }
`

const server = new ApolloServer({
    typeDefs: [rootQuery, Professor, Course], 
    resolvers,
    mocks: false
})

module.exports = server