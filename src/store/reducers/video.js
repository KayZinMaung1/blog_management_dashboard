import { DELETE_VIDEO, SET_VIDEOS } from "../type"

const initialState = {
    videos: []
}

const video = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIDEOS:
            return {
                ...state,
                videos: action.payload
            }
        case DELETE_VIDEO:
            return{
                ...state,
                videos: state.videos.filter((video)=> video.id !== action.payload)
            }
        default:
            return state;
    }
}
export default video;