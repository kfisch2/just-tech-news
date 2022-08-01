const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// router.get('/', (req, res) => {
//  res.render('homepage', {
//   id: 1,
//   post_url: 'https://handlebars.js/guide/',
//   title: 'Handlebars Docs',
//   createdat: new Date(),
//   vote_count: 10,
//   comments: [{}, {}],
//   user: {
//    username: 'test_user'
//   }
//  });
// });


router.get('/', (req, res) => {
 Post.findAll({
  attributes: [
   'id',
   'post_url',
   'title',
   'created_at',
   [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  ],
  include: [
   {
    model: Comment,
    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
    include: {
     model: User,
     attributes: ['username']
    }
   },
   {
    model: User,
    attributes: ['username']
   }
  ]
 })
  .then(dbPostData => {
   const posts = dbPostData.map(post => post.get({ plain: true }))
   // pass a single post object into the homepage template
   //.get provides us with 
   res.render('homepage', { posts });
  })
  .catch(err => {
   console.log(err);
   res.status(500).json(err);
  });
});



module.exports = router;