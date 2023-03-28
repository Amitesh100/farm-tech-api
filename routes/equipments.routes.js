const express = require("express");
const router = express.Router();
const multer = require("multer");
const EquipmentsController = require("../controllers/equipments.controller");

const storage = multer.diskStorage({
   // destination to store the uploaded file
   destination: (req, file, cb) => {
      cb(null, './uploads');
   },
   // naming of the file to be stored as
   filename: (req, file, cb) => {
      cb(null, new Date().getSeconds().toString() + file.originalname);
   }
});

const fileFilter = (req, file, cb) => {
   if (file.mimetype === "image/png" || file.mimetype === "image/png") {
      // Accepting the file
      cb(null, true);
   } else {
      // rejecting the file
      cb(null, false);
   }
}

const upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5  // accepts upto 5mb image
   },
   fileFilter: fileFilter
})

// listing of the equipments route

router.get("/", EquipmentsController.equipments_get_all);
router.post("/", upload.single('equipmentImage'), EquipmentsController.equipment_post);
router.get("/:equipmentId", EquipmentsController.equipment_view);

module.exports = router;