import React from 'react'
import {Card, CardActions, CardMedia, CardContnet, Button, Typography} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux'
import {deletePost, likePost} from '../../../actions/posts'
import useStyles from '../SinglePost/styles'

const SearchResPost = ({post}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} />

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">Tags: {post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>

      <CardActions className={classes.cardActions}>
        <Button size='small' color='secondary' onClick={() => dispatch(likePost(post._id))}>
           {post.favorite? <FavoriteIcon fontSize='small'/> : <FavoriteBorderIcon fontSize='small'/>}
        </Button>
        <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}> <DeleteIcon fontSize='small'/> </Button>
      </CardActions>
    </Card>
  )
}

export default SearchResPost