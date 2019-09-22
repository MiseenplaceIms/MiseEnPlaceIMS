const express = require("express");
const router = express.Router();

const QRCode = require("qrcode");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

router.route("/scan/:v_id/:i_id").get(async (req, res) => {
  const { v_id, i_id } = req.params;
  try {
    const params = {
      TableName: "entries",
      KeyConditionExpression: "venue_id = :v and item_id = :i",
      // venue_id and item_id must be the primary and secondary keys in the dynamo table for the KEVs to be valid
      ExpressionAttributeValues: {
        ":v": `${v_id}`,
        ":i": `${i_id}`
      }
    };

    await docClient.query(params, (err, data) => {
      if (err) {
        res.status(500).json({ message: `Unable to retrieve item: ${err}` });
      } else {
        console.log("have data! ", data);
        if (data.Items[0]) {
          res.status(200).json({ item: data.Items[0] });
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
  const { venue_id, item_id, ...rest } = req.body;
  if (!venue_id || !item_id) {
    return res
      .status(400)
      .json({ message: "Request must include venue_id and item_id." });
  }

  try {
    const qr_code = await QRCode.toDataURL(`${venue_id},${item_id}`);

    const uploadParams = {
      Bucket: "mise-en-place-qr-codes",
      Key: `test_${Date.now()}.jpg`,
      Body: new Buffer.from(
        qr_code.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
      ContentEncoding: "base64",
      ContentType: "image/jpeg"
    };

    await s3.upload(uploadParams, async (err, data) => {
      if (err) {
        // error occurred during upload
        console.log("upload error: ", err);
      } else {
        console.log("upload data: ", data);
        // data was saved correctly and Location was generated
        if (data.Location) {
          const params = {
            TableName: "entries",
            Item: {
              venue_id: `${venue_id}`,
              item_id: `${item_id}`,
              item: { ...rest, qr_code }
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
        } else {
          res.status(500).json({
            error: "An error occurred while saving that entry to s3."
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
