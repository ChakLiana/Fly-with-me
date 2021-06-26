const path = require("path");
const router = require("express").Router();
const authRoutes = require("../routers/auth/index copy");


// Auth Routes
router.use('/auth', authRoutes);

// API Routes

// If no routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
