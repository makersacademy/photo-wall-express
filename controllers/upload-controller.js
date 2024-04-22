const apiResponse = require("../helpers/api-response");
const uploadFile = require("../middlewares/upload");
const Post = require("../models/post");

const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.STORAGE_ACCOUNT_NAME;
if (!accountName) throw Error('Azure Storage accountName not found');

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new DefaultAzureCredential()
);
const containerClient = blobServiceClient.getContainerClient(process.env.STORAGE_CONTAINER_NAME);

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

      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      const uploadOptions = {
        blobHTTPHeaders: { blobContentType: req.file.mimetype }
      }
      const uploadBlobResponse = await blockBlobClient.uploadFile(path, uploadOptions);

      Post.create({
        author: req.body.author,
        filePath: 'https://' + process.env.STORAGE_ACCOUNT_NAME +  '.blob.core.windows.net/'+ process.env.STORAGE_CONTAINER_NAME +'/' + fileName
      });

      return res.redirect('/')
    } catch (err) {
      console.error("Error saving file:", err);
      return apiResponse.ErrorResponse(res, err);
    }
  }
