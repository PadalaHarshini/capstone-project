const mongoose = require("mongoose");

const ensureDbReady = (_req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database is not connected. Check MongoDB Atlas connection settings."
    });
  }

  next();
};

module.exports = ensureDbReady;
