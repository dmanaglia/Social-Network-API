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

thoughtSchema.methods.getDate = function () {
  let month = this.createdAt.getMonth();
  let day = this.createdAt.getDate();
  let year = this.createdAt.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
