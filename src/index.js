import dotenv from "dotenv";
import { DB_NAME } from "./constants.js"
import connectDB from "./db/index.js";

dotenv.config({path: "./.env"});



connectDB()
























// ; (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//     app.on("error", (err) => {
//       console.log("Error connecting to MongoDB:", err);
//       throw err;
//     })

//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port http://localhost:${process.env.PORT}`);
//     });

//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// })()