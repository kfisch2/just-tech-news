const User = require('./User');
const Post = require('./Post');


// create associations
// User may have many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// Each post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Post };
