require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// app.use(cors());
// const cors = require("cors");
app.use(
  cors({
    origin: ["*"], // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET, POST, PUT, DELETE
    credentials: true, // If using cookies/auth headers
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send("Task Manager API");
});

app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));


startServer();
