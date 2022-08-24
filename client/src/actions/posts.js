import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, SEARCH} from '../constants/actionTypes'
import * as api from '../api' 

//Action creators
export const getImages = () => async(dispatch) => {
    try{
        const {data} = await api.fetchImages()

        dispatch({type: FETCH_ALL, payload: data})
    }catch(err){
        console.log(err.message)
    }
}

export const createPost = (post) => async(dispatch) => {
    try{
        const {data} = await api.createPost(post)

        dispatch({type: CREATE, payload: data})
    } catch(err){
        console.log(err.message)
    }
}

export const updatePost = (currentPostID, updatedPost) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(currentPostID, updatedPost) //this call returns the updatedPost (response). and we destructure the data from it

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (postID) => async (dispatch) => {
    try {
        await api.deletePost(postID) 

        dispatch({type: DELETE, payload: postID})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (postID) => async (dispatch) => {
    try {
        const {data} = await api.likePost(postID)

        console.log(data)
        dispatch({type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const searchImages = (searchQuery) => async (dispatch) => {
    try {
        const {data} = await api.searchImages(searchQuery)

        dispatch({type: SEARCH, payload: data })
    } catch (error) {
        console.log(error)
    }
}