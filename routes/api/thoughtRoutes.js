const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtID
router
    .route('/:thoughtID')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtID/reactions
router
    .route('/:thoughtID/reactions')
    .post(addReaction)
    
// /api/thoughts/:thoughtID/reactions/:reactionID
router
    .route('/:thoughtID/reactions/:reactionID')
    .delete(removeReaction)


module.exports = router;
