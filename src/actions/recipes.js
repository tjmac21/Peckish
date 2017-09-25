import * as types from './types';
import Api from '../lib/api';

export function addRecipe() {
    return {
        type: types.ADD_RECIPE,
    }
}

export function fetchRecipes(ingredients) {
    return (dispatch,getState) => {
        const params = [
            `ingredients=${encodeURIComponent(ingredients)}`,
            'fillingredients=false',
            'limitLicense=false',
            'number=20',
            'ranking=1',
        ].join('&');
        return Api.get(`/recipes/findByIngredients?${params}`).then( resp => {
            dispatch(setSearchedRecipes({ recipes: resp }));
        }).catch( (err) => {
            console.log(err);
        })
    }
}

export function setSearchedRecipes( { recipes } ){
    return {
        type:types.SET_SEARCHED_RECIPES,
        recipes
    }
}