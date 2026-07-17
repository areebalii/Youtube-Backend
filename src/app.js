import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRoutes from "./routes/user.routes.js";
import tweetRoutes from "./routes/tweet.routes.js";
import likeRoutes from "./routes/like.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import videosRoutes from "./routes/video.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tweets", tweetRoutes);
app.use("/api/v1/likes", likeRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/videos", videosRoutes);
app.use("/api/v1/playlist", playlistRoutes);

export { app };