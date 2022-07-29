const Vote = require('./Vote');
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');




// create associations
// User may have many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// Each post has one user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// allows us to view posts a single user has voted on
// as well as a single post that many users have voted on

//--------POSTS----------//
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
}); 

//--------VOTES----------//
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

//--------COMMENTS----------//
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});



module.exports = { User, Post, Vote, Comment };
