const express = require('express')
const server = require('./schema')


require('./db/setup')

const app = express()

server.applyMiddleware({
    app
})

const PORT = 9090
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})