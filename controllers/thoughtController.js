const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res){
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtID })
        // .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res){
        Thought.create(req.body)
        .then((thought) => {
            User.findOneAndUpdate(
                { _id: req.body.userID },
                { $addToSet: { thoughts: thought } },
                { runValidators: true, new: true }
            )
            .then((user) =>
                !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID!' })
                : res.json(thought)
            )
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((course) =>
            !course
            ? res.status(404).json({ message: 'No thought with that ID!' })
            : res.json(course)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtID })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID!' })
            : res.json({ message: 'Thought and reactions deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res){
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtID },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $pull: { reactions: { reactionId: req.params.reactionID } } },
            { runValidators: true, new: true }
        )
        .then((student) =>
            !student
            ? res
                .status(404)
                .json({ message: 'No student found with that ID :(' })
            : res.json(student)
        )
        .catch((err) => res.status(500).json(err));
    }
}