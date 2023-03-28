const express = require("express");
const router = express.Router();
const EquipmentsController = require("../controllers/equipments.controller");

// listing of the equipments route

router.get("/", EquipmentsController.equipments_get_all);
router.post("/", EquipmentsController.equipment_post);
router.get("/:equipmentId", EquipmentsController.equipment_view);

module.exports = router;