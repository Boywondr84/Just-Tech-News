const router = require('express').Router();
const sequelize = require('sequelize');
const { Comment, Post, User, Votes } = require('../models');

// router.get('/', (req, res) => {
//     res.render('homepage', {
//         id: 1,
//         post_url: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs',
//         created_at: new Date(),
//         vote_count: 10,
//         comments: [{}, {}],
//         user: {
//             username: 'test_user'
//         }
//     });
// });

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

module.exports = router;