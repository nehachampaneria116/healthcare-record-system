const express = require("express");
const router = express();
const verifyTokenAdminDoctor = require("../helpers/jwt").verifyTokenAdminDoctor;
const verifyTokenDoctor = require("../helpers/jwt").verifyTokenDoctor;
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * IMPORT CONTROLLER
 */
const {
  addPatient,
  listPatient,
  updatePatient,
  deletePatient,
  getSingle
} = require("../controller/patientsController/index");
const {
  addMedicalData,
  listMedicalData,
  getSingleMedicalData,
  deleteMedicalData,
} = require("../controller/medicalDataController/index");

/**
 * ADD PATIENTS
 */
router.post("/", verifyTokenAdminDoctor,
  [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("dob").isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      var ctrlResponse = await addPatient.add(req);
      res.status(ctrlResponse.code).send(ctrlResponse);
    } catch (err) {

      res.send(err);
    }
  });

/**
 * LIST OF patients
 */
router.get("/", verifyTokenAdminDoctor, async (req, res) => {
  try {
    var ctrlResponse = await listPatient.list(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * UPDATE PATIENTS
 */
router.put("/:id", verifyTokenAdminDoctor, async (req, res) => {
  try {
    var ctrlResponse = await updatePatient.update(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * GET PATIENT
 */
router.get("/:id", verifyTokenAdminDoctor, async (req, res) => {
  try {
    var ctrlResponse = await getSingle.getSingle(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * DELETE PATIENTS
 */
router.delete("/:id", verifyTokenDoctor, async (req, res) => {
  try {
    var ctrlResponse = await deletePatient.delete(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * ADD medical data
 */
router.post("/:id/medicalData", verifyTokenDoctor,
  async (req, res) => {
    try {
      var ctrlResponse = await addMedicalData.add(req);
      res.status(ctrlResponse.code).send(ctrlResponse);
    } catch (err) {
      res.send(err);
    }
  });

/**
 * list of medical data by patients
 */
router.get("/:id/medicalData", verifyTokenAdminDoctor, async (req, res) => {
  try {
    var ctrlResponse = await listMedicalData.list(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});


/**
 * get record
 */
router.get("/:id/medicalData/:recordId", verifyTokenAdminDoctor, async (req, res) => {
  try {
    var ctrlResponse = await getSingleMedicalData.getSingle(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * delete record
 */
router.delete("/:id/medicalData/:recordId", verifyTokenAdminDoctor, async (req, res) => {
  try {
    var ctrlResponse = await deleteMedicalData.delete(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
