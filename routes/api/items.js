const express = require('express');
router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   Get api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res, next) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => {
            res.json(items);
        })
        .catch(err => console.log(err));
});

// @route   POST api/items
// @desc    Create A Post
// @access  Public
router.post('/', (req, res, next) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res, next) => {
    Item.findById(req.params.id)
        .then(item => {
            item.remove().then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
        });
});

module.exports = router;