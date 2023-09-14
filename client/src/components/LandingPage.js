import React from "react";
import {Link} from "react-router-dom";
import { NavBar } from "./NavBar";


export default function LandingPage(){

    return(
        <div>
            <NavBar /> 
            <h1>¿Quien dijo que las series animadas eran solo para niños?</h1>
        <Link to= "/home">
            <button>INGRESAR</button>
        </Link>
        </div>
    )
}