import { Button } from '@mui/material'
import {Grid} from '@material-ui/core';
import React, {useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { searchImages } from '../actions/posts';
import SearchResPost from './Posts/SearchResPost/post'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Results = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const queryTags = query.get('tags')
  const matchingPosts = useSelector((state) => state.posts)
  //const [matchingPostsObj, setMPO] = useState({data: []})
  console.log(matchingPosts)

  useEffect(() => {
    dispatch(searchImages({tags: queryTags}))

  }, [dispatch]);
  
  const handleGoBack = () => {
    console.log('clicked go back')
    navigate('/')
  }


  return (
    <div>
        <h1>Search Results for: {queryTags} </h1>
        <Button onClick={handleGoBack}>go back</Button>
        {/* {setMPO(useSelector((state) => state.posts))} */}
        
        
        {!matchingPosts.length? <h3>No matching results</h3> : 
          <Grid container alignItems='stretch' spacing={3}>
            {matchingPosts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6}>
                <SearchResPost post={post}/>
              </Grid>
            ))}
          </Grid>
        }
      

    </div>
  )
}

export default Results