const { mongo_uri } = require("./secret");
const {connect} = require("mongoose");

const configDB = async () => {
  try {
    const conn = await connect(mongo_uri);
    console.log("Database connected " + conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = configDB