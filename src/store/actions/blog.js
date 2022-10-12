import { call, host } from "../../services/api";
import { serverErrorMessage, unauthorizedMessage } from "../../utils/message";
import { DELETE_BLOG, REMOVE_ERROR, SET_BLOG, SET_BLOGS, SET_DELETE, SET_ERROR, SET_LOADING, SET_SUCCESS } from "../type"

export const getBlogs = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", "api/blogs");
            const data = response.data.blogs;

            const transformResult = data.map((data) => {
                const photoUrl = `${host}/api/images/${data.photo}`;
                return {
                    ...data,
                    key: data.id,
                    photoUrl: photoUrl
                }
            });

            dispatch({
                type: SET_BLOGS,
                payload: transformResult,
            });

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

export const createBlog = (data) => {
    console.log("data:", data)
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", "api/blogs", data);
            dispatch({ type: SET_SUCCESS, payload: true });
            dispatch({
                type: REMOVE_ERROR,
            });
        } catch (error) {
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
        setTimeout(() => {
            dispatch({ type: SET_SUCCESS, payload: false });
        }, 1);
        dispatch({ type: SET_LOADING });
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_DELETE, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("delete", `api/blogs/${id}`);
            dispatch({ type: SET_DELETE, payload: true });
            dispatch({ type: DELETE_BLOG, payload: id });
            dispatch({
                type: REMOVE_ERROR
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
        setTimeout(() => {
            dispatch({ type: SET_DELETE, payload: false });
        }, 1);
        dispatch({ type: SET_LOADING });
    }
}

export const getBlog = (id) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING });
        try {
            const response = await call("get", `api/blogs/${id}`);
            const blog = response.data.blog;
            const photoUrl = `${host}/api/images/${blog.photo}`;

            const transformResult = {
                ...blog,
                photoUrl: photoUrl
            }

            dispatch({
                type: SET_BLOG,
                payload: transformResult,
            });
            dispatch({
                type: REMOVE_ERROR
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

export const editBlog = (id, data) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUCCESS, payload: false });
        dispatch({ type: SET_LOADING });
        try {
            await call("post", `api/blogs/${id}`, data);
            dispatch({ type: SET_SUCCESS, payload: true });
            dispatch({
                type: REMOVE_ERROR
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

        setTimeout(() => {
            dispatch({ type: SET_SUCCESS, payload: false });
        }, 1);
        dispatch({ type: SET_LOADING });
    }
}