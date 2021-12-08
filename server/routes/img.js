var express = require("express");
const fs = require("fs");
const path = require("path");
const imgService = require("../services/img");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../config/s3.json");
var router = express.Router();

/**
 * @swagger
 *  /api/img:
 *    posts:
 *      tags:
 *      - posts
 *      description: 이미지 관련 API
 *
 *      responses:
 *       200:
 *        description: 이미지 업로드 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *
 */

// fs.readdir("uploads", (error) => {
//   // uploads 폴더 없으면 생성
//   if (error) {
//     fs.mkdirSync("uploads");
//   }
// });

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

// const upload = multer({
//   // dest: "uploads/",
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

router.post("/image", upload.single("file"), function (req, res, next) {
  // console.log(req);
  // console.log(req);
  console.log(req.file);
  res.status(200).send(req.file.location);
  // imgService.uploadImg(req, res, next);
});

// router.post("/", function (req, res, next) {
// console.log(req.body);
// res.json({ url: `/img/${req.file.filename}` });
// imgService.uploadImg(req, res, next);
// });

module.exports = router;
