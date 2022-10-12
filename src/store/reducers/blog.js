import { DELETE_BLOG, SET_BLOG, SET_BLOGS } from "../type"

const initialState = {
    blog: {},
    blogs: [],
}

const blog = (state = initialState, action) => {
    switch (action.type) {
        case SET_BLOG:
            return {
                ...state,
                blog: action.payload
            }
            case SET_BLOGS:
                return{
                    ...state,
                    blogs: action.payload
                }
            case DELETE_BLOG:
                return{
                    ...state,
                    blogs: state.blogs.filter((blog)=> blog.id !== action.payload)
                }
        default:
            return state;
    }
}
export default blog;