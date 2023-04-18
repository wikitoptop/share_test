const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const bookRoutes = require("./routes/books");
const deviceRoutes = require("./routes/devices");
const timeRoutes = require("./routes/times");
const payRoutes = require("./routes/pays");
const recordRoutes = require("./routes/records");
const commentRoutes = require("./routes/comments");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/books", bookRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/times", timeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/pays", payRoutes);
app.use("/api/records", recordRoutes);

app.listen("5000", () => {
  console.log("Backend is running.");
});
