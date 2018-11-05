const { gql } = require('apollo-server-express')

module.exports = gql`
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

    type Comment {
        id: ID!
        name: String!
        body: String!
    }
`