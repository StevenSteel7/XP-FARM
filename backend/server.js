import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from 'cors'
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

//rest object
const app = express();
//configure env
dotenv.config(); // here we can also give path if path is there

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//databse config
connectDB();




//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome buroo to ecommerce app</h1>");
  });

  //PORT
const PORT = process.env.PORT || 8080;

//run listen
// has callback function
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });
  