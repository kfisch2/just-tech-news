const User = require('./User');
const Post = require('./Post');

module.exports = { User, Post };

// create associations
// User may have
User.hasMany(Post, {
  foreignKey: 'user_id'
})
