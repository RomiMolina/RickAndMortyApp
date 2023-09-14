const { Router } = require("express");
const axios = require("axios");
const { Character, Episode } = require("../db.js");  // destructurar se importa objetos


const router = Router();

// Configurar los routers
// - [ ] GET https://rickandmortyapi.com/api/character
// - [ ] GET https://rickandmortyapi.com/api/episode

router.get("/getAll", async (req, res)=>{

    try {
        // LLAMADO A LA API
        const api = await axios.get("https://rickandmortyapi.com/api/character");
        const infoApi = api.data.results.map((p) => {
            const obj= {
                name: p.name,
                species: p.species ,
                origin: p.origin.name ,
                image: p.image,
            }
            return obj
        })
    
        // LLAMADO A LA DB
        const infoDB = await Character.findAll({include : [{model: Episode}]});
    
        const totalInfo = [...infoApi, ...infoDB];
        res.json(totalInfo); // al principio debe traer un arreglo vacio
    
    } catch (e) {
        res.status(500).json({ error: "Error fetching data", details: error.message });
}});

// router.get("/charge-episodes", (req, res)=>{
//     try {
//         axios.get("https://rickandmortyapi.com/api/episode")
//             .then((response) => {
//                 const aux = response.data.results.map((ep) => {
//                   return {
//                     id: ep.id,
//                     name: ep.name,
//                   };
//                 });

//         Episode.bulkCreate(aux) //guardo los episodios en la db
//             .then(() => {
//             res.json({ msg: "Success" });
//             })
//             .catch((error) => {
//             res.status(500).json({ error: "Error saving episodes", details: error.message });
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({ error: "Error fetching episodes from API", details: error.message });
//           });
//     } catch (error) {
//         res.status(400).json({ error: "Error charge-episodes", details: error.message });
//     } 
// });

router.post("/create", async (req, res)=>{
    const { name, species, origin, image, episodes }= req.body  // extraigo los datos 
    if(!name || !origin) res.status(400).json("msg: Missing dates") // valido los datos y me fijo q coincidan con allownull db
     
    try {
    const obj = { name, species, origin, image};
    const newPj = await Character.create(obj); 
    // console.log(nuevopj)
    
    newPj.addEpisodes(episodes); //relaciona mi persj nuevo con los episodios que le mando 
    
    const aux = Character.findByPk(newPj.id, {include: [{model: Episode}]})

    res.send(aux)
    // res.send(newPj)
    } catch (error) {
        res.send("Error create", error)
    }
});


router.get("/character/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ msg: "Missing ID" });
    }
  
    try {
      // Buscar el personaje en la base de datos utilizando Sequelize
      const findDb = await Character.findByPk(id, { include: [{ model: Episode }] });
  
      if (!findDb) {
        // Si el personaje no se encuentra en la base de datos, puedes manejarlo aquí
        // Por ejemplo, podrías hacer una solicitud a la API de Rick and Morty y buscar el personaje allí
        // Luego, puedes guardar ese personaje en tu base de datos si lo deseas
  
        const findApi = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const find = findApi.data.results.filter(el => el.id == id);
  
        // Responde con un mensaje indicando que el personaje no se encontró en la base de datos
        res.status(404).json({ msg: "Character not found" });
      } else {
        // Responder con los datos del personaje encontrado en la base de datos
        res.json(findDb);
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching character", details: error.message });
    }
  });
  



module.exports = router;
