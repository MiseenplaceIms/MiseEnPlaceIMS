const express = require("express");
const router = express.Router();

const QRCode = require("qrcode");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();

router.route("/scan/:v_id/:i_id").get(async (req, res) => {
  const { v_id, i_id } = req.params;

  try {
    //todo: reconfigure data model to search for unique v_id AND i_id
    const params = {
      TableName: "venues",
      Key: {
        venue_id: `${v_id}`
        // item_id: `${i_id}`
      }
    };

    await docClient.get(params, (err, data) => {
      if (err) {
        res.status(500).json({ message: `Unable to retrieve item: ${err}` });
      } else {
        if (data.Item) {
          res.status(200).json({ item: data.Item });
        } else {
          res.status(404).json({ message: "That item does not exist." });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.route("/generate").post(async (req, res) => {
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

    const params = {
      TableName: "venues",
      Item: {
        venue_id: `${venue_id}`,
        item_id: `${item_id}`,
        qr_code: qr_code
      }
    };

    await docClient.put(params, (err, data) => {
      if (err) {
        res.status(500).json({ error: `Unable to add item: ${err}` });
      } else {
        console.log("success!");
      }
    });

    res.status(200).json({ qr_code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
