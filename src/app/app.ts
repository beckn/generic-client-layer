import express, { Express, Router, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
interface InitAppParams {
  app: Express;
}

const initApp = ({ app }: InitAppParams) => {
  const router: Router = express.Router();
  dotenv.config();
  app.options(
    "*",
    cors<Request>({
      origin: process.env.NODE_ENV === "*",
      optionsSuccessStatus: 200,
      credentials: true,
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
  );

  app.use(
    cors({
      origin: process.env.NODE_ENV === "*",
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"]
    })
  );

  app.set("trust proxy", true);
  app.use(express.urlencoded({ extended: true, limit: "200mb" }));
  app.use(express.json({ limit: "200mb" }));
  app.use(router);

  router.use("/ping", (req: Request, res: Response) => {
    res.json({
      status: 200,
      message: "Generic Client Layer Started"
    });
  });

  return app;
};

export { initApp };
