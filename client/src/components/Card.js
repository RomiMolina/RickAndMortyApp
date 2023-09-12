import React from "react";


export default function Card({ name, species, origin, image } ){

    return(
        <div>
            <h3>{name} </h3>
            <h3>{species}</h3>
            <h3>{origin}</h3>
            <img src={image} alt= "img not found" width="200 px" height="250px"/>
        </div>
    )

}