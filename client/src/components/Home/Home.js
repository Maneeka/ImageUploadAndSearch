import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getImages } from '../../actions/posts';
import SearchBar from '../SearchBar';
import Posts from '../Posts/Posts';
import useStyles from './styles'
import UploadForm from '../UploadForm/UploadForm';

const Home = () => {
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => {
        dispatch(getImages());
    }, [currentId, dispatch]);

  return (
    <>
        {/* description */}
        <Container maxWidth="md">
          <Typography variant="h6" align="center" color="inherit">This is a website where you can upload/store pictures and some tags related to them. You can then also use those tags to search for all the images that match the searched tags. </Typography>
        </Container>

        {/* search bar */}
        <Container className={classes.SearchBar} maxWidth="sm" >
             <SearchBar />
        </Container>

        {/* posts and upload form */}
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <UploadForm className={classes.uploadForm} currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
                </Grid>
            </Container>
        </Grow>
    </>
  );
};

export default Home;