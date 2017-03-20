const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const startingCoins = 100;

const userSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    require: true
  },

  google: String,
    // All the google stuff
  password: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  activeChats: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Chat'
    }],
    default: []
  },
  coins: {
    type: Number,
    default: startingCoins
  },
  interests: {
    type: [{
      type: String,
      enum: ['stuff', 'travel'] // TODO change this to a real enum
    }]
  }

});

const questionSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: String,
    enum: ['stuff', 'travel'],
    required: true
     // TODO change this to a real enum
  },
  asker: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  bounty: {
    type: Number,
    default: 0
  },
  live: {
    type: Boolean,
    default: true
// Allows the bounty to only increase when the question is live, not when
// it's being answered.
  }
});

const activechatSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now
  },
  question: {
    type: Schema.ObjectId,
    ref: 'Question',
    required: true
    // You can freeze the bounty and then get it from the question
  },
  asker: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  answerer: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  messages: {
    type: [{
      type: Schema.ObjectId,
      ref: 'Message'
    }],
    defualt: []
  }
});

const messageSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now
  },
  readReceipt: {
    type: Date
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  },
  recipient: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  }
});

const archivedchatSchema = mongoose.Schema({
  // For now we'll say the archivedChat is from the perspective of the asker
  createdTime: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0
  },
  queston: {
    type: String
  },
  answerer: {
    type: String
  },
  messages: {
    type: [{
      content: String,
      asker: Boolean
    // The boolean above lets us know which side we should render the message
    // wheh an archive is rendered
    }],
    required: true
  },
  upVotes: {
    type: Number,
    default: 0
    // This number gets increased everytime a user upvotes a an archivedChat
  },
  views: {
    type: Number,
    default: 0
  }

});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const activeChat = mongoose.model('activeChat', activechatSchema);
const Message = mongoose.model('Message', messageSchema);
const archivedChat = mongoose.model('archivedChat', archivedchatSchema);

module.exports = {
  User,
  Question,
  activeChat,
  Message,
  archivedChat
};
