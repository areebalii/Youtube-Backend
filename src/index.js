import 'dotenv/config';
import { DB_NAME } from "./constants.js"
import connectDB from "./db/index.js";
import { app } from "./app.js";

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