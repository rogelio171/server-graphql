const casual = require('casual')

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