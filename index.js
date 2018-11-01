const express = require('express')
const bodyParser = require( 'body-parser')

const app = express()

const PORT = 9090
app.listen(PORT, () => {
    console.log('Running...')
})