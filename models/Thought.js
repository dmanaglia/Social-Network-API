const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.friends.length;
});

thoughtSchema.methods.getDate = function () {
    console.log("Parse date here");
    return this.createdAt;
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
