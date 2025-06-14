import React, { useEffect, useReducer } from 'react';
import { getall } from '../../../Service/FoodService.jsx';
import Thumbnails from '../../Thumbnails/Thumbnails.jsx';
import { search } from '../../../Service/FoodService.jsx';
import { useParams } from 'react-router-dom';
import Search from '../../Search/Search.jsx';
import NotFound from '../../NotFound/NotFound.jsx';
import Footer from '../../Footer/Footer.jsx';
import ChatBot from '../../ChatBot.jsx';
import CalorieSearch from '../../CalorieSearch.jsx';

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
      // else call getall function 
      loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
    }, [searchTerm]);

    return (
        <>
            <Search/>
            {foods.length === 0 && <NotFound/>}
            <Thumbnails foods={foods} />
            <CalorieSearch />
            <Footer />
            <ChatBot />
            
        </>
    );
};

export default Homepage;
