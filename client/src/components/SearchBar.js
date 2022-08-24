import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useSelector} from 'react-redux'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { searchImages } from '../actions/posts';
import {useNavigate} from 'react-router-dom'

export default function SearchBar() {
  const allPosts = useSelector((state) => state.posts)
  
  const allTagsDup = []
  for(let i = 0; i < allPosts.length; i++){
    for(let j = 0; j < allPosts[i].tags.length; j++){
      allTagsDup.push(allPosts[i].tags[j])
    }
  }
  const allTagsSet = new Set(allTagsDup)
  const allTags = [...allTagsSet]
  
// const allTags = ['blackPants', 'cropTop', 'cremePant', 'blackLeatherJacket', 'dress', 'pretty', 'greenTop', 'blueJeans', 'denim', 'whiteTop', 'roseGold', 'jumpsuit', 'blackBoots', 'stylish', 'bts']

  
  const dispatch = useDispatch()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (event, value) => setSelectedOptions(value);
  
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    console.log('clicked submit')
    if(selectedOptions.length){
      dispatch(searchImages({tags: selectedOptions.join(',')}))
      navigate(`/posts/search?tags=${selectedOptions.join(',')}`)
    } else{
      navigate('/')   //redirect back to home page. ie, all posts cuz no tags specified
    }

    //clear the selectedOptions
    console.log(selectedOptions);
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <>
      <Autocomplete
        multiple
        id="tags-standard"
        options={allTags}
        getOptionLabel={(option) => option}
        onChange={handleChange}
        renderInput={(params) => (   
          <TextField
            
            {...params}
            variant="standard"
            label="Search for images"
            placeholder="Enter tags"
            onKeyPress={handleEnter}
            
          />
        )}
      />

      <button onClick={handleSubmit}>Submit!</button>

    </>
       
  );
}

