const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({ region: "us-east-1" });

const s3 = new aws.S3();

module.exports = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mise-en-place-qr-codes",
    limits: {
      filesize: 50
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "bucket-owner-full-control",
    metadata: (req, file, cb) => {
      const { venue_id, item_id } = req.params;
      cb(null, {
        fieldName: `venue${venue_id}+item${item_id}`
      });
    },
    key: (req, file, cb) => {
      const { venue_id, item_id } = req.params;
      cb(null, (venue_id + "_" + Date.now()).toString());
    }
  })
});
