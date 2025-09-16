import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contato = sequelize.define("Contato", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default Contato;
