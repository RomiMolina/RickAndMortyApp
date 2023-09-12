import axios from "axios"; 
//import { GET_CHARACTERS } from "../types/index.js";

export function getCharacters(){

    return async function(dispatch){
    
        let json = await axios.get("http://localhost:3001/getAll", {});
        return dispatch({
            type: "GET_CHARACTERS", 		
            payload: json.data
        })
    }
}

export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}
 export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
 }