import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/product"
import { readdirSync } from "fs-extra";
import * as path from "path";
import * as fs from "fs";
import {connectDB} from './config/db';


const app = express();
const port = 2000;  

console.log('__dirname',__dirname);

app.use(morgan('dev'))
app.use(cors())
app.use('/img',express.static('uploads'))
app.use(express.json());


const routesPath = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesPath);
// console.log('',routesPath)
routeFiles.forEach((file) => {
    const routePath = path.join(routesPath, file);
    console.log(routePath)
    const route = require(routePath).default; // Assumes default export is an express.Router // function
    // console.log(typeof route)
    if (route && typeof route === 'function') {
        app.use('/api', route);
      } else {
        console.error(`Error loading route from ${routePath}.`);
      }
  });

connectDB();
app.listen(port, () => {
    console.log(`listening on port ${port}`);
    }
);