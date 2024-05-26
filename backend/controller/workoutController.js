const mongoose = require('mongoose');
const Workout = require('../model/workout_model')

// get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id
        const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }) // sorted by createdAt in descending order
        res.status(200).json({ workouts })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// get single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'Workout not found' })
    try {
        const workout = await Workout.findById(id) // if finding id by findById
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }
        res.status(200).json({ workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
// create new workout
const createWorkout = async (req, res) => {
    const { title, description, reps, load } = req.body

    let emptyFields = []
    if (!title) emptyFields.push('title')
    if (!description) emptyFields.push('description')
    if (!reps) emptyFields.push('reps')
    if (!load) emptyFields.push('load')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, description, reps, load, user_id })
        res.status(200).json({ msg: 'Created workout', workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete new workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'Workout not found' })
    try {
        const workout = await Workout.findOneAndDelete({ _id: id }) //if finding id by findOneAndDelete
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }
        res.status(200).json({ msg: 'Deleted successfully', workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
// update new workout - to be implemented
const updateWorkout = async (req, res) => {
    const { id } = req.params
    const { title, description, reps, load } = req.body
    try {
        const workout = await Workout.findByIdAndUpdate(id, { title, description, reps, load }, { new: true })
        res.status(200).json({ msg: 'Updated Successfully', workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
module.exports = { getAllWorkouts, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout }