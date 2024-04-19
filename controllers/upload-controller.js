const apiResponse = require("../helpers/api-response");
const uploadFile = require("../middlewares/upload");
const Post = require("../models/post");

exports.upload = 
  async (req, res) => {
    await uploadFile(req, res);
    try {
      if (req.file == undefined) {
        return apiResponse.validationErrorWithData(
          res,
          "Upload a file please!",
          {}
        );
      }

      const path = req.file.path;
      const fileName = path.substring(path.lastIndexOf('/') + 1);

      Post.create({
        author: req.body.author,
        filePath: fileName
      });

      return res.redirect('/')
    } catch (err) {
      console.error("Error saving file:", err);
      return apiResponse.ErrorResponse(res, err);
    }
  }
