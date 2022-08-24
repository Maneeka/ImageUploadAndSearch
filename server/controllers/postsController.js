const express = require('express')
const uploadedImage = require('../models/Image')
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const getImages = async (req, res) => {
    try{
        const images = await uploadedImage.find()
        console.log(images)
        res.status(200).json(images)
    }catch(err){
        res.status(404).json({message: err.message})
    }
    
}

const createImage = async (req, res) => {
    const post = req.body
    const newPost = new uploadedImage(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)  //201: succesful creation
    }catch(err){
        res.status(409).json({message: err.message})    //conflict
    }
}

const updateImage = async (req, res) => {
    const { id } = req.params
    const { title, message, creator, selectedFile, tags } = req.body
    
    console.log(id)

        
    if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await uploadedImage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
    
}

const deletePost = async (req, res) => {
    const {id} = req.params

    if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await uploadedImage.findByIdAndRemove(id)

    res.json('Image deleted successfully')
}

const likePost = async (req, res) => {
    const {id} = req.params

    if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const oldPost = await uploadedImage.findById(id)
    const updatedPost = await uploadedImage.findByIdAndUpdate(id, {favorite: !oldPost.favorite}, {new: true})

    res.json(updatedPost)
}

const searchImages = async (req, res) => {
    try {
        const queriedTagsStr = req.query.tags
        const queriedTags = queriedTagsStr.split(',')
        console.log(`in server: ${queriedTagsStr}`)

        const matchingPosts = await uploadedImage.find({ tags: {$in: queriedTags} })

        res.status(200).json(matchingPosts)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
    
}

module.exports = {getImages, createImage, updateImage, deletePost, likePost, searchImages}