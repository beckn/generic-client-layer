import express, { Express } from "express";
import { startServer } from "./app/server";
import dotenv from "dotenv";
const app: Express = express();

dotenv.config();

startServer(app);
