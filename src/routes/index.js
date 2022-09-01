var express = require('express');
var router = express.Router();
const videogame = require("./videogames.js");
const genre = require("./genre.js");
// const axios = require('axios');
// const {API_KEY} = process.env;
// const {Platform} = require("../db.js")


router.use('/videogame', videogame);
router.use('/genre', genre);

// router.get('/platforms', async (req, res)=> {
//     const apiPlatforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
//     const apiPlatform = await apiPlatforms.data.results.map(el => el.name)
//     apiPlatform.forEach( el => {
//         Platform.findOrCreate({
//             where : {
//                 name: el
//             }
//         })
//     });
//     const all = await Platform.findAll();
//     res.status(200).send(all)
// })

module.exports = router;
