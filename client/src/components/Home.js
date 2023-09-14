import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getCharacters , filterCreated, orderByName} from "../actions"; // importo las acciones
import {Link} from "react-router-dom"; 
import Card from "./Card";
import Paginate from "./Paginate";


export default function Home(){

    const dispatch= useDispatch()
    const [order, setOrder] = useState("")
    //PAGINADO//
    const allCharacters= useSelector((state) => state.characters) // ESTADO GLOBAL 
    const [currentPage, setCurrentPage] = useState(1)  // 
    const [characterPerPage, setCharacterPerPage] = useState(6) //
    const indexOfLastCharacter = currentPage * characterPerPage
    const indexOfFirstCharacter= indexOfLastCharacter - characterPerPage
    const currentCharacter = allCharacters.slice(indexOfFirstCharacter , indexOfLastCharacter )

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    
    useEffect(()=>{
        dispatch(getCharacters());
    },[dispatch])
    
    // ||||| lo que hace es volver a cargar todos los personajes ||||
    function handleClick(e){
    e.preventDefault();
    dispatch(getCharacters())
    }
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    

    return(
        <div>
            <Link to= "/create">CREAR PERSONAJE</Link>
            <h1>MI PAGINA WEB</h1>

            <button onClick={e => {handleClick(e)}}>VOLVER A CARGAR</button> 
        <div>
            <select onChange={e => handleSort(e)} >
                <option value="asc" >Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value="All">ALL</option>
                <option value="created">CREATED</option>
                <option value="api">EXISTING</option>
            </select>
        <Paginate 
        characterPerPage={characterPerPage} 
        allCharacters={allCharacters.length} 
        paginate={paginate} 
        />
        { currentCharacter?.map( (el) =>{
            return (
            <fragment>
            <Link to= {"/home" + el.id}>
                <Card name={el.name} species= {el.species} origen= {el.origin} image= {el.image} />
            </Link>
            </fragment>
         );
        })} 
         </div>
        </div>
    
       )
    
    
    }
    