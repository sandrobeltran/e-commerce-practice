import { connect, connection } from "mongoose";
import colors from "colors"

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  await connect(process.env.MONGODB_URI)
    .then((db) => {
      conn.isConnected = db.connections[0].readyState;
    })
    .catch((error) => {
      console.log(error);
    });
};

connection.on("connected", ()=>{
    console.log("DB IS CONNECTED".green)
})

connection.on("error", ()=>{
    console.log(error)
})