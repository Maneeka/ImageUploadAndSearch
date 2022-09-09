const express = require('express')
const router = express.Router()
const {getImages, createImage, updateImage, deletePost, likePost, searchImages} =  require('../controllers/postsController.js')

//https://image-upload-and-search.herokuapp.com/posts
router.get('/', getImages)
router.post('/', createImage)
router.patch('/:id', updateImage) //update an existing document
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)
router.get('/search', searchImages)

module.exports = router