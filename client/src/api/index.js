import axios from 'axios'

const url = 'https://image-upload-and-search.herokuapp.com/posts'

export const fetchImages = () => axios.get(url)

export const createPost = (newPost) => axios.post(url, newPost)

export const updatePost = (currentID, updatedPost) => axios.patch(`${url}/${currentID}`, updatedPost)

export const deletePost = (currentID) => axios.delete(`${url}/${currentID}`)

export const likePost = (currentID) => axios.patch(`${url}/${currentID}/likePost`)

export const searchImages = (searchQuery) => axios.get(`${url}/search?tags=${searchQuery.tags}`)
 