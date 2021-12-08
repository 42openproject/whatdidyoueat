const fs = require("fs");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/s3.json");

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "images.whatdidyoueat",
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
    },
  }),
});

s3.deleteObject(
  {
    Bucket: "버킷명",
    Key: "파일명",
  },
  function (err, data) {}
);

function uploadImg(req, res, next) {}

module.exports = {
  uploadImg,
  upload,
};
