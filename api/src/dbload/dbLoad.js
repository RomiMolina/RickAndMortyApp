const { Episode } = require ("../db.js");
const axios = require("axios");

 const getEpisodes = async()=> {
    await axios.get('https://rickandmortyapi.com/api/episode')
        .then(( r )=> {
        let aux= r.data.results.map(ep=> {

        const obj= {
                id: ep.id,
                name: ep.name
            }
            return obj
        } );

        Episode.bulkCreate(aux); //guardo los episodios en la db
    }) 
};

module.exports = {
    getEpisodes
}