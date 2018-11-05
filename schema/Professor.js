const { gql } = require('apollo-server-express')
module.exports = gql`
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

    input NewProfessor {
        name: String!
        nationality: String!
        gender: Gender
    }

    input ProfessorEditable {
        name: String
        nationality: String
        gender: Gender
    }
`