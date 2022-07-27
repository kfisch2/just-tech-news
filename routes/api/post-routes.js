const router = require('express').Router();
const { Post, User } = require('../../models');

// GET all posts ? (mod says user...)
router.get('/', (req, res) => {
  console.log('==========');
  Post.findAll({
    // Query config
    attributes: ['id', 'title', 'post_url', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;

// Post.hasOne(User, {

// })