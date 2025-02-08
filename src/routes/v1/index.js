const express = require('express')
const applicationRoutes = require('./applications')
const jobRoutes = require('./jobs')
const userRoutes = require('./users')
const companyRoutes = require('./companies')

const router = express.Router()

// company routes
router.use('/companies', companyRoutes)


// job routes
router.use('/jobs', jobRoutes)

// user routes with login - register
router.use('/users', userRoutes)

// application routes
router.use('/applications', applicationRoutes)


module.exports = router