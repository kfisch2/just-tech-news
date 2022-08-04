const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment, Post, User } = require('../../models');

// GET all comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text'],
    include: [
      {
        model: Post,
        attributes: ['title', 'id'],
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a comment
router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// DELETE comment by id
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  }).then((dbCommentData) => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment with that id exists' });
      return;
    }
    res.json(dbCommentData);
  });
});

module.exports = router;
