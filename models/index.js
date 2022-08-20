const User = require('./User');
const Post = require('./Post');
const Votes = require('./Votes');

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Post, {
    through: Votes,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Votes,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Votes.belongsTo(User, {
    foreignKey: 'user_id'
});

Votes.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Votes, {
    foreignKye: 'user_id'
});

Post.hasMany(Votes, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Votes };