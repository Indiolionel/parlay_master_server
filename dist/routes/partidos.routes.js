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
router.put('/nba/resumen', nba_controllers_1.NbaController.editarResumen);
router.put('/nba/pick', nba_controllers_1.NbaController.editarPick);
//Nhl
router.get('/nhl', nhl_controllers_1.NhlController.getAll);
// router.post('/nhl', NhlController.create);
router.put('/nhl/resumen', nhl_controllers_1.NhlController.editarResumen);
router.put('/nhl/pick', nhl_controllers_1.NhlController.editarPick);
//Mlb
router.get('/mlb', mlb_controllers_1.MlbController.getAll);
// router.post('/mlb', MlbController.create);
router.put('/mlb/resumen', mlb_controllers_1.MlbController.editarResumen);
router.put('/mlb/pick', mlb_controllers_1.MlbController.editarPick);
exports.default = router;
