"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nba_controllers_1 = require("../controllers/nba.controllers");
const nhl_controllers_1 = require("../controllers/nhl.controllers");
const mlb_controllers_1 = require("../controllers/mlb.controllers");
const router = (0, express_1.Router)();
//Nba
router.get('/nba', nba_controllers_1.NbaController.getAll);
// router.post('/nba', NbaController.create);
//Nhl
router.get('/nhl', nhl_controllers_1.NhlController.getAll);
// router.post('/nhl', NhlController.create);
//Mlb
router.get('/mlb', mlb_controllers_1.MlbController.getAll);
// router.post('/mlb', MlbController.create);
exports.default = router;
