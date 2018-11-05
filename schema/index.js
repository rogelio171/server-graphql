const { ApolloServer, gql } = require('apollo-server-express')
const Professor = require('./Professor')
const Course =  require('./Course')
const resolvers = require('../resolvers')
const mocks = require('../mocks')

const rootQuery = gql`
    union SearchResult = Professor | Course

    type Query {
        courses: [Course]
        professors: [Professor]
        course(id: Int) : Course
        professor(id:Int): Professor
        search(query: String!): [SearchResult]
    }

    type Mutation {
        professorAdd(professor: NewProfessor): Professor
        professorEdit(professorId: Int!, professor: ProfessorEditable): Professor
        professorDelete(professorId: Int!) : Professor

        courseAdd(course: NewCourse): Course
        courseEdit(courseId: Int!, course: CourseEditable):Course
        courseDelete(courseId: Int!) : Course
    }
`

const server = new ApolloServer({
    typeDefs: [rootQuery, Professor, Course], 
    resolvers,
    mocks: false,
    formatError: (error) => {
        return {
            name: error.name,
            message: error.message
        }
    }
})

module.exports = server