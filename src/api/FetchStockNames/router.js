import * as express from "express";
import controller from "./controller";

export default express.Router().get("/", controller.getStockNames);

// const express = require("express");
// const router = express.router();
// const controller = express("./controller");
// router.get("/", controller.getStockNames);

// module.exports = router;
