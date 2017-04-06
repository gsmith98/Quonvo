const express = require('express');

const router = express.Router();


// ////////////////////////////// PUBLIC ROUTES ////////////////////////////////
// Users who are not logged in can see these routes


// /////////////////////////// END OF PUBLIC ROUTES /////////////////////////////

router.use((req, res, next) => {
  if (!req.user) {
    return res.json({
      response: 'You are not logged in'
    });
  }
  return next();
});

// ////////////////////////////// PRIVATE ROUTES ////////////////////////////////
// Only logged in users can see these routes


// /////////////////////////// END OF PRIVATE ROUTES /////////////////////////////

module.exports = router;
