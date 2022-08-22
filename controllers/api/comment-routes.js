const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'user_id', 'post_id', 'comment_text',
        ],
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

    router.post('/', (req, res) => {
        Comment.create({
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            comment_text: req.body.comment_text
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });

    router.delete('/:id', (req, res) => {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbCommentData => {
                if (!dbCommentData) {
                    res.status(500).json({ message: "No comment matched that ID" });
                    return;
                }
                res.json(dbCommentData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });



module.exports = router;