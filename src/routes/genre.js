const axios = require('axios');
const { Router } = require("express");
const router = Router();
const {Genre } = require("../db.js");
const {API_KEY} = process.env;

router.get("/", async (req, res) => {
    try {
        const allGenresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let all = allGenresAPI.data.results.map((el) => el.name);
        
        all.forEach((genre) => {
            Genre.findOrCreate({
                where:{
                    name: genre
                }
            })
        })
        const allGenres = await Genre.findAll()
        res.status(200).send(allGenres)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;