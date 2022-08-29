const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;

//Hacemos la busqueda en la base de datos:

async function getDB() {
    let videogame = await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }]
    });
    return videogame;
};

//Hacemos la busqueda por ID o por NAME

async function getDbId(id) {
    const gameDB = await Videogame.findOne({
        where: {
            id
        },
        include: [Genre],
    });
    return gameDB;
}

//Hacemos la busqueda a la API para que me traiga 100 juegos:

async function getApiVideogame() {
    let apiInfo = [];
    try {
        let searchVideogame = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        let searchVideogame2 = await axios.get(searchVideogame.data.next);
        let fusion = searchVideogame.data.results.concat(searchVideogame2.data.results)
        let searchVideogame3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        let searchVideogame4 = await axios.get(searchVideogame3.data.next);
        let fusion2 = searchVideogame3.data.results.concat(searchVideogame4.data.results)
        let plus = fusion.concat(fusion2)
        let searchVideogame5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        let all = searchVideogame5.data.results.concat(plus);

        apiInfo = all.map((data) => {
            return {
                id: data.id,
                name: data.name.toLowerCase(),
                image: data.background_image,
                release: data.released,
                rating: data.rating,
                description: data.description_raw,
                genres: data.genres.map((ele) => {
                    return {
                      name: ele.name,
                    };
                  }),
                platform: data.platforms.map(e => e.platform.name),
            }
        })
        const resultApi = await Promise.all(apiInfo)
        return resultApi
    }
    catch (error) {
        console.log(error)
    }

};

//Unimos API y DB

async function allVideogames() {
    const infoDB = await getDB();
    const infoAPI = await getApiVideogame();
    const allData = [...infoAPI,...infoDB]
    return allData;
};

//Hacemos busqueda por ID

async function getVideogameById(id) {
    const regex = /([a-zA-Z]+([0-9]+)+)/;
    try {
        if (regex.test(id)) {
            let videogame = await getDbId(id)
            return videogame;
        } else {
            const apiId = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            const detail = apiId.data;
            return [{
                id: detail.id,
                name: detail.name,
                image: detail.background_image,
                release: detail.released,
                rating: detail.rating,
                description: detail.description_raw,
                genres: detail.genres.map(e => e.name),
                platform: detail.platforms.map(e => e.platform.name),
            }]
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDB,
    getApiVideogame,
    getVideogameById,
    allVideogames,
}