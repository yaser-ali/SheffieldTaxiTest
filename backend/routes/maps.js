// backend/routes/maps.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Route to calculate the most efficient route between two locations
router.get("/route", async (req, res) => {
  const { origin, destination } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch route data" });
  }
});

module.exports = router;