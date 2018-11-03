const { gql } = require('apollo-server-express')

const schema = gql`

    """ This is a course in the system """
    type Course {
        id: ID!
        title: String!
        """This is the description of the course"""
        description: String!
        professor: Professor
        rating: Float
        comments: [Comment]
    }

    type Professor {
        id: ID!
        name: String!
        nationality: String!
        gender: Gender
        courses: [Course]
    }

    enum Gender {
        MASCULINE
        FEMENINE
    }

    type Comment {
        id: ID!
        name: String!
        body: String!
    }

    type Query {
        courses: [Course]
        professors: [Professor]
        course(id: Int) : Course
        professor(id:Int): Professor
    }
`

module.exports = schema