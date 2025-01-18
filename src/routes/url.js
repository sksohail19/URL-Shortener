const express = require("express");
const router = express.Router();
const { handleGenerateShortURL, handleGetAnalytics } = require("../controllers/url.js");

//router.get("/:shortid", handleGetURL);  // Corrected route
router.post("/", handleGenerateShortURL);

router.get("/analytics/:shortid",handleGetAnalytics);


module.exports = router;
