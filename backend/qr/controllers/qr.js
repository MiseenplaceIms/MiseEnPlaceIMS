const express = require("express");
const router = express.Router();

const QRCode = require("qrcode");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1", endpoint: "" });

router.route("/scan/:v_id/:i_id").get(async (req, res) => {
  // GET /scan/:v_id/:i_id
  // -grab from params
  // -retrieve item object from db, send to client

  // data model (loose): v_id, i_id, qr_code
  const { v_id, i_id } = req.params;

  try {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: "venues",
      Key: {
        venue_id: `${v_id}`,
        item_id: `${i_id}`
      }
    };

    console.log("Retrieving entry...");
    const item = await docClient.get(params, (err, data) => {
      if (err) {
        console.err(
          "Unable to retrieve item. Error JSON: ",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added read successfully: ", JSON.stringify(data, null, 2));
      }
    });

    res.status(200).json({ item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.route("/generate").post(async (req, res) => {
  // POST: /generate
  // - create QR
  // -stores QR in db by finding matching v_id and item_id
  // -sends back QR to client

  // endpoint will return the QR code containing venue_id and client_id to the client,
  // and update the db entry for that
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

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: "venues",
      Item: {
        venue_id: `${venue_id}`,
        item_id: `${item_id}`,
        qr_code
      }
    };

    console.log("Adding new entry...");
    await docClient.put(params, (err, data) => {
      if (err) {
        console.err(
          "Unable to add item. Error JSON: ",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added item successfully: ", JSON.stringify(data, null, 2));
      }
    });

    res.status(200).json({ qr_code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
