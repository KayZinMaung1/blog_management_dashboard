import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
const PirvateRoute = ({children})=>{
    const auth = useSelector((state)=> state.auth);
    if(auth.isAuthenticated){
        return <Navigate to="/admin" replace/>
    }
    return children;
}
export default PirvateRoute;