import { formatDistanceToNow } from 'date-fns'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
    const { user } = useAuthContext()
    const { dispatch } = useWorkoutContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })

        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json.workout })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Description: </strong>{workout.description}</p>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p style={{ fontSize: '12px' }}>Created {formatDistanceToNow(new Date(workout.createdAt), 'yyyy-MM-dd')} ago</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default WorkoutDetails