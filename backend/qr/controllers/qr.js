const express = require("express");
const router = express.Router();

const QRCode = require("qrcode");

router.route("/").post(async (req, res) => {
  const { venue_id, item_id } = req.body;
  if (!venue_id || !item_id) {
    return res
      .status(400)
      .json({ message: "Request must include venue_id and item_id." });
  }

  try {
    const qr_code = await QRCode.toDataURL(`${venue_id},${item_id}`);

    // // upload image to s3 and store response into const
    // const location = await uploadQR()
    // if (location) {
    //     // post to database
    // }
    res.status(200).json({ qr_code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
