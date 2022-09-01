const axios = require('axios');
const { Router } = require("express");
const {
    allVideogames,
    getVideogameById,
} = require("../controllers/videogames.js");
const router = Router();
const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        const allGames = await allVideogames(name);
        const allAPI = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
        const data = allAPI.data.results
        data.map(e => {
            return {
                image: e.background_image,
                name: e.name,
                genres: e.genres,
                rating: e.rating,
            }
        });
        const allData = data.concat(allGames)
        if (name) {
            let all = allData.filter((game) => game.name?.toLowerCase().trim().includes(name.toLowerCase())).slice(0, 15)
        res.status(200).send(all.length === 0 ? "Game not found" : all )
        } else{
            res.status(200).send(allGames)
        }
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let games = await getVideogameById(id);
        if (games) {
            return res.send(games)
        } else {
            res.json({ msg: `Game with the id ${id} no exits` })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, description, release, genres, platform, rating, image, createdInDb } = req.body;
        if (!name || !description || !platform) {
            res.status(400).send('Not params')
        }

        const newVideogame = await Videogame.create({
            name,
            description,
            release,
            platform,
            rating,
            image,
            genres,
            createdInDb,
        });

        const relations = await Genre.findAll({
            where: { name: genres }
        });

        newVideogame.addGenre(relations);
        return res.status(200).send(newVideogame);
    } catch (error) {
        res.send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const searchId = await Videogame.findByPk(id)
        if (!searchId) {
            return res.status(404).json({ msg: "Videogame not Found" })
        } else {
            await searchId.destroy()
            return res.status(200).json({ msg: `The Game with the ${id} is eliminated` })
        }
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router;