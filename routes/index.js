var express = require('express');
var router = express.Router();
var actions = require('./../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/blog', async function(req, res, next) {
  var stories = await actions.getPosts();
  res.render('blog', { data: stories });
});

router.get('/addPost', function(req, res, next) {
  res.render('addBlog');
});

router.post('/submit', async function(req, res, next) {
  var id = await actions.addToDb(req.body.title,req.body.link,req.body.postBody,req.body.imageLink);
  res.redirect(`/posts/${id}`);
});

router.get('/posts/:id', async function(req, res, next) {
  var data = await actions.getPost(req.params.id);
  res.render('post', {data});
});

router.get('/allposts',  async function(req, res, next) {
  var data = await actions.getAllPosts();
  res.render('allposts',{data});
});


module.exports = router;
