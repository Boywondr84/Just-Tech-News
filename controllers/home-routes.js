const router = require('express').Router();
const sequelize = require('sequelize');
const { Comment, Post, User, Votes } = require('../models');

router.get('/', (req, res) => {
    console.log('============');
    Post.findAll({
        attributes: [
            'id', 'post_url', 'title', 'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM votes WHERE post.id = votes.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        // Query configuration
        include: [
            // Comment model here:
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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
            // console.log(dbPostData[0]);
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session) {
        res.redirect('/');
        return;
    }
    res.render('login');
});


module.exports = router;