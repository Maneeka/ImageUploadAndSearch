import React from 'react'
import SinglePost from './SinglePost/singlePost'
import {useSelector} from 'react-redux'
import {Grid} from '@material-ui/core'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import useStyles from './styles'

const Posts = ({setCurrentId}) => {
  const classes = useStyles()
  const allPosts = useSelector((state) => state.posts)
  console.log(allPosts)
  
  return (
    !allPosts.length? 
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress color='inherit'/>
    </Box> : 
    
    (
      <Grid container alignItems='stretch' spacing={3}>
        {allPosts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <SinglePost post={post} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts