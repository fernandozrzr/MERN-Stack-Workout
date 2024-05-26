import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            })
            const json = await response.json()
            console.log('Type of fetched workouts:', typeof json); // Debugging
            if (response.ok) {
                console.log('Fetched workouts:', json);  // Debugging
                dispatch({ type: 'SET_WORKOUTS', payload: json.workouts })
            }
        }
        if (user) { fetchWorkouts() }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home