const express = require("express");

const router = express.Router();

router.route("/:venue_id/item/:item_id").post(async (req, res) => {
  const { venue_id, item_id } = req.params;
});

module.exports = router;
