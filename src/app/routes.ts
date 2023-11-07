import express, { Router } from "express";
import { validateRequest } from "../common";
import { searchController } from "../modules/search/controller";
const router: Router = express.Router();

export const clientLayerRoutes = () => {
  router.post("/search", validateRequest, searchController);
  router.post("/select", validateRequest, () => {});
  router.post("/init", validateRequest, () => {});
  router.post("/confirm", validateRequest, () => {});
  router.post("/update", validateRequest, () => {});
  router.post("/status", validateRequest, () => {});
  router.post("/cancel", validateRequest, () => {});
  router.post("/track", validateRequest, () => {});
  router.post("/support", validateRequest, () => {});
  router.post("/rating", validateRequest, () => {});

  return router;
};
