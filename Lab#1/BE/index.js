require('colors')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

// Body parser
app.use(express.json())
app.use(cors())

// for running the FE
app.use(express.static(path.join(__dirname, '../FE')));


const employeeRoutes = require('./routes/employee')

// Mount routers
app.use('/api/v1/employee', employeeRoutes)

const PORT = 3000

app.listen(PORT, console.log(`Server running on port ${PORT}`.bgBlue))