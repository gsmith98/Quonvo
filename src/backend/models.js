const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const startingCoins = 100;
const subjects = ['Stuff', 'Travel'];

const userSchema = mongoose.Schema({
  createdTime: {
    type: Number,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    required: true
  },

  google: String,
    // All the google stuff
  name: {
    type: String,
    default: 'Anonymous'
  },
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
      enum: subjects // TODO change this to a real enum
    }]
  }

});

const questionSchema = mongoose.Schema({
  createdTime: {
    type: Number,
    default: Date.now()
  },
  subject: {
    type: String,
    enum: subjects,
    required: true
     // TODO change this to a real enum
  },
  asker: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  handle: {
    type: String,
    default: 'Anonymous'
  },
  answerer: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
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
  bounty: {
    type: Number,
    default: 0
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
    type: Date,
    default: Date.now
    // This may be done only on frontend
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

const archivedchatSchema = mongoose.Schema({
  // For now we'll say the archivedChat is from the perspective of the asker
  createdTime: {
    type: Number,
    default: Date.now()
  },
  rating: {
    type: Number,
    default: 0
  },
  question: {
    type: String
  },
  questionId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  questionSubject: {
    type: String
  },
  asker: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  askerHandle: {
    type: String
  },
  answerer: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  answererHandle: {
    type: String
  },
  messages: {
    type: Array,
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
  },
  questionAnswered: {
    type: Boolean,
    required: true
  }


});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const ActiveChat = mongoose.model('activeChat', activechatSchema);
const Message = mongoose.model('Message', messageSchema);
const ArchivedChat = mongoose.model('archivedChat', archivedchatSchema);

module.exports = {
  User,
  Question,
  ActiveChat,
  Message,
  ArchivedChat,
  subjects,
};
