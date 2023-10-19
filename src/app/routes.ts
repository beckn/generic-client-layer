import express, { Router } from "express";

const router: Router = express.Router();

export const routes = () => {
  router.use("/search", () => {});
  router.use("/select", () => {});
  router.use("/init", () => {});
  router.use("/confirm", () => {});
  router.use("/update", () => {});
  router.use("/status", () => {});
  router.use("/cancel", () => {});
  router.use("/track", () => {});
  router.use("/support", () => {});
  router.use("/rating", () => {});

  return router;
};
