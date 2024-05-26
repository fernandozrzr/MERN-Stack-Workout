import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const { dispatch } = useWorkoutContext()
    const [emptyFields, setEmptyFields] = useState([])
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in!')
            return
        }
        const workout = { title, description, load, reps }
        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()

        if (response.ok) {
            setTitle('')
            setDescription('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_WORKOUT', payload: json.workout })
        } else {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Description: </label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />
            <label>Load (kg): </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm