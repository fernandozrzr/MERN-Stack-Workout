import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchWorkout } = useWorkoutContext();
    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user');
        // update AuthContext
        dispatch({ type: 'LOGOUT' });
        // update WorkoutContext
        dispatchWorkout({ type: 'SET_WORKOUTS', payload: null });
    }
    return { logout }
}