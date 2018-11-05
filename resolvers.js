const Course = require('./models/Course')
const Professor = require('./models/Professor')

const resolvers = {
    Query: {
        courses: () => Course.query().eager('[professor, comments]'),
        professors: () => Professor.query().eager('courses'),
        course: (rootValue, args) => Course.query().eager('[professor, comments]').findById(args.id),
        professor: (rootValue, args) => Professor.query().eager('courses').findById(args.id)
    }
}

module.exports = resolvers