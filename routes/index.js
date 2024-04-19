var express = require("express");
const Post = require("../models/post");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
	Post.find()
		.then(posts => {
			res.render("index", { posts: posts });
		})
		.catch(err => { res.send('Photo wall: Error connecting to DB'); });
});

module.exports = router;