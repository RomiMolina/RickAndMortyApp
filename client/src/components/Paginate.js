import React from "react";


export default function Paginate ({ characterPerPage, allCharacters, paginate }){
	const pageNumbers = [];
	for (let i = 0; i<= Math.ceil(allCharacters/characterPerPage); i++){
		pageNumbers.push(i + 1)  // para que el empiece en 1
}

	return(
        <nav>
            <ul className="paginate">
            { pageNumbers && 
                pageNumbers.map(number =>(
                <li className="number" key={number}>
                     <a onClick={()=> paginate(number)}>{number}</a>
                </li>
                ))}
            </ul>
        </nav>
    )}