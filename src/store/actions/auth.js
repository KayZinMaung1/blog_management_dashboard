import { call, setAccessToken } from "../../services/api";
import { serverErrorMessage, unauthorizedMessage } from "../../utils/message";
import { REMOVE_ERROR, SET_CURRENT_USER, SET_ERROR, SET_LOADING } from "../type"

export const login = (data) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        dispatch({ type: REMOVE_ERROR });
        try {
            const response = await call("post", "api/login", data);
            const token = response.data;
            console.log("Access token:", token)

            localStorage.setItem("jwtToken", token);
            await setAccessToken(token);

            const userResponse = await call("get", "api/user/currentuser");
            console.log("User:", userResponse.data)
            const { userName, email, role } = userResponse.data;

            dispatch({
                type: SET_CURRENT_USER,
                payload: { userName, email, role },
            })

            dispatch({
                type: REMOVE_ERROR,
            })
        }
        catch (error) {
            const { status } = error.response;

            if (status === 401) {
                localStorage.removeItem("jwtToken");
                dispatch({
                    type: SET_ERROR,
                    payload: unauthorizedMessage,
                });
            }

            else {
                dispatch({
                    type: SET_ERROR,
                    payload: serverErrorMessage,
                });
            }

        }
        dispatch({ type: SET_LOADING });
    }
}

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const userResponse = await call("get", "api/user/currentuser");
            const { userName, email, role } = userResponse.data;

            dispatch({
                type: SET_CURRENT_USER,
                payload: { userName, email, role },
            })

            dispatch({
                type: REMOVE_ERROR,
            })
        }
        catch (error) {
            const { status } = error.response;

            if (status === 401) {
                localStorage.removeItem("jwtToken");
                dispatch({
                    type: SET_ERROR,
                    payload: unauthorizedMessage,
                });
            }

            else {
                dispatch({
                    type: SET_ERROR,
                    payload: serverErrorMessage,
                });
            }

        }
        dispatch({ type: SET_LOADING })
    }
}

export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem("jwtToken");
        setAccessToken(null);
        dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        });
        dispatch({
            type: REMOVE_ERROR
        });
    }
}