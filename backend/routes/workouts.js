const express = require('express')
const router = express.Router()
const workoutController = require('../controller/workoutController')
const requireAuth = require('../middleware/requireAuth')

//Require Auth before accessing any api routes
router.use(requireAuth)

//Get all workout
router.get('/', workoutController.getAllWorkouts)

//Get single workout
router.get('/:id', workoutController.getSingleWorkout)

//Add workout
router.post('/', workoutController.createWorkout)

//update workout
router.patch('/:id', workoutController.updateWorkout)

//Add workout
router.delete('/:id', workoutController.deleteWorkout)

module.exports = router
