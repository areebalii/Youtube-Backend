import dotenv from "dotenv";
import { DB_NAME } from "./constants.js"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({path: "./.env"});



connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
  })
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with an error code
  });























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