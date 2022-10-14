import { DELETE_BLOG, SET_BLOG, SET_BLOGS, SET_TOTAL_COUNT, SET_TOTAL_PAGES } from "../type"

const initialState = {
    blog: {},
    blogs: [],
    totalCount: 0,
    totalPages: 0
}

const blog = (state = initialState, action) => {
    switch (action.type) {
        case SET_BLOG:
            return {
                ...state,
                blog: action.payload
            }
        case SET_BLOGS:
            return {
                ...state,
                blogs: action.payload
            }
        case DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter((blog) => blog.id !== action.payload)
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload
            }

        default:
            return state;
    }
}
export default blog;