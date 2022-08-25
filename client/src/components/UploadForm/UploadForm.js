//when you click the like, it should send this info to the backend to modify it in the database

//set a way to record date, add time to date cariable, find out why its dissapearing from console.

//fix handleDate. the time lag or whatever

//material ui:
    //info alert for entering atleast one tag
    //heart icon

//set up alert

import React, {useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import {Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import {useSelector} from 'react-redux'
import Card from "@material-ui/core/Card";

import useStyles from './styles'

const UploadForm = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({tags: '', selectedFile: '', favourite: false, uploadedAt: new Date() })
    const selectedImage = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null)
    const [like, setLike] = useState(false)
    const [fileChosen, setFileChosen] = useState(false)
    
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        if(selectedImage) setPostData(selectedImage)
    }, [selectedImage, fileChosen]) //run when selectedImage value changes from nothing to something

    
    const handleTags = (e) => {
        const result = e.target.value.split(',').map(str => str.trim())
        setPostData({ ...postData, tags: result })
    }
    const handleLike = () => {
        setLike(!like)
        setPostData({...postData, favourite: like})
        console.log(postData.favourite)
    }
    const handleDate = async () => {
        
        const current = new Date()    
        setPostData({...postData, uploadedAt: current})
        console.log(postData.uploadedAt)
    }

    const handleFiles = (base64) => {
        setFileChosen(true)
        setPostData({ ...postData, selectedFile: base64 })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId, postData))
        }else{
            handleDate()
            dispatch(createPost(postData))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(0)
        setPostData({tags: [], selectedFile: '', favourite: false, uploadedAt: new Date() })
        setFileChosen(false)
    }


  return (
    <Card className={classes.uploadForm} elevation={24}>
        <h2>{currentId? 'Edit the' : 'Upload an'} Image</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Tags:
                <input type="text" placeholder='Enter comma separated tags...' onChange={handleTags} value={postData.tags}/>
            </label>
            <br></br> 
            <p>Like: <span onClick={handleLike}>{postData.favourite ? "❤️" : "♡"}</span></p>
            
            <div className='fileUploader' ><FileBase type="file" multiple={false} onDone={({ base64 }) => {handleFiles(base64)}} /></div>
            <br></br> 
            <Button  variant="contained"  color="primary" size="medium" type="submit" fullWidth >Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

        </form>
    </Card>
  ) 
}

export default UploadForm