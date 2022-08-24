import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKE, SEARCH} from '../constants/actionTypes'

const func = (images = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...images, action.payload];
        
        case UPDATE:
        case LIKE:
            return images.map((post) => post._id === action.payload._id? action.payload : post)

        case DELETE:
            return images.filter((post) => post._id !== action.payload)

        case SEARCH:
            return action.payload
        
        default:
            return images;
    }
    
}

export default func