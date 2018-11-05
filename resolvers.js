const Course = require('./models/Course')
const Professor = require('./models/Professor')

const resolvers = {
    Query: {
        courses: () => Course.query().eager('[professor, comments]'),
        professors: () => Professor.query().eager('courses'),
        course: (rootValue, args) => Course.query().eager('[professor, comments]').findById(args.id),
        professor: (rootValue, args) => Professor.query().eager('courses').findById(args.id),
        search: (_, args) => {
            return [
                Professor.query().findById(41),
                Course.query().findById(1)
            ]
        }
    }, 
    SearchResult: {
        __resolveType: (obj) => {
            if(obj.name) return 'Professor'
            return 'Course'
        }
    },
    Mutation: {
        professorAdd: (_, args) => {
            return Professor.query().insert(args.professor)
        },
        professorEdit: (_, args) => {
            return Professor.query().patchAndFetchById(args.professorId, args.professor)
        },
        professorDelete:(_, args) => {
            return Professor.query().findById(args.professorId).then((professor) => {
                return Professor.query().deleteById(args.professorId).then((rowsDeleted) => {
                    if(rowsDeleted) return professor

                    throw new Error(`The professor with id ${args.professorId} could not be deleted.`)
                })
            }) 
        },
        courseAdd: (_, args) => {
            return Course.query().insert(args.course)
        },
        courseEdit: (_, args) => {
            return Course.query().patchAndFetchById(args.courseId, args.course)
        },
        courseDelete: (_, args) => {
            return Course.query().findById(args.courseId).then((course) => {
                return Course.query().deleteById(args.courseId).then(() => course)
            })
        }
    }
}

module.exports = resolvers