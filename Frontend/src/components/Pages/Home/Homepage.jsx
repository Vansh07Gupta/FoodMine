import React, { useEffect, useReducer } from 'react';
import { getall} from '../../../Service/FoodService';
import Thumbnails from '../../Thumbnails/Thumbnails';
import { search } from '../../../Service/FoodService';
import { useParams } from 'react-router-dom';
import Search from '../../Search/Search';
const initialState = { foods: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

const Homepage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { foods } = state;
    const { searchTerm } = useParams();
    useEffect(() => {
      const loadFoods = searchTerm ? search(searchTerm) : getall(); 
      loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
    }, [searchTerm]);

    return (
        <>
            <Search/>
             <Thumbnails foods={foods} />
        </>
    );
};


export default Homepage;
