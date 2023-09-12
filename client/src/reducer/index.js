
//import { GET_CHARACTERS } from "../types/index.js";

const initialState = {
    characters: [],
    allCharacters: []
};

export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case "GET_CHARACTERS":
            return{
                ...state,
                characters: action.payload,
                allCharacters: action.payload,
        }
        case "FILTER_CREATED":
            
            const createdFilter= action.payload === "created" ? state.allCharacters.filter(el => el.created) : state.allCharacters.filter(el => !el.created)
            return{
                ...state,
                characters: action.payload === "All" ? state.allCharacters : createdFilter
            }
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === "asc" ?
                state.characters.sort(function(a, b){
                    if(a.name > b.name){
                        return 1 ;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0
                }) :
                state.characters.sort(function(a, b){
                    if(a.name > b.name){
                        return -1; 
                    }
                    if(b.name > a.name){
                        return 1 ;
                    }
                    return 0;
                })
            return {
                ...state,
                characters: sortedArr
            }

        default: 
        return state 
    }
  
}
