const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platform: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM(
          "Web",
          "Pc",
          "PlayStation 5",
          "Xbox One",
          "PlayStation 4",
          "Xbox Series S/X",
          "Nintendo Switch",
          "iOS",
          "Android",
          "Nintendo 3DS",
          "Nintendo DS",
          "Nintendo DSi",
          "macOS",
          "Linux",
          "Xbox 360",
          "Xbox",
          "PlayStation 3",
          "PlayStation 2",
          "PlayStation",
          "PS Vita",
          "PSP",
          "Wii U",
          "Wii",
          "GameCube",
          "Nintendo 64",
          "Game Boy Advance",
          "Game Boy Color",
          "Game Boy",
          "SNES",
          "NES",
          "Classic Macintosh",
          "Apple II",
          "Commodore / Amiga",
          "Atari 7800",
          "Atari 5200",
          "Atari 2600",
          "Atari Flashback",
          "Atari 8-bit",
          "Atari ST",
          "Atari Lynx",
          "Atari XEGS",
          "Genesis",
          "SEGA Saturn",
          "SEGA CD",
          "SEGA 32X",
          "SEGA Master System",
          "Dreamcast",
          "3DO",
          "Jaguar",
          "Game Gear",
          "Neo Geo"
        )
      ),
      allowNull: false,
    },    
    image:{
      type: DataTypes.STRING,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {timestamps: false});
};
