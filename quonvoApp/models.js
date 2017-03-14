const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now
  },
  IDToken: {
    // All the google stuff
  },
  password: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  questions: [{
    type: Schema.ObjectId,
    ref: 'Question'
  }],
  activeChats: [{
    type: Schema.ObjectId,
    ref: 'Chat'
  }],
  coins: [{
    type: Number,
    default: 100
  }],
  interests: [{
    type: String
  }]

});

const questionSchema = mongoose.Schema({
  createdTime: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: String,
    enum: ['stuff', 'stuff1']
  },
  asker: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  },
  bounty: {
    type: Number
  },
  live: {
    type: Boolean
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
    ref: 'Question'
  },
  asker: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  answerer: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number
  },
  bounty: {
    type: Number
  },
  success: {
    type: Boolean
    // This denotes whether the asker wanted his question to be answered by
    // someone else after the conversation concludes.
  },
  messages: [{
    type: Schema.ObjectId,
    ref: 'Message'
  }]
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
    type: String
  },
  recipient: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

const archivedchatSchema = mongoose.Schema({
  // For now we'll say the archivedChat is from the perspective of the asker
  createdTime: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number
  },
  queston: {
    type: String
  },
  answerer: {
    type: String
  },
  messages: [{
    content: String,
    asker: Boolean
    // The boolean above lets us know which side we should render the message
    // wheh an archive is rendered
  }],
  upVotes: {
    type: Number
    // This number gets increased everytime a user upvotes a an archivedChat
  },
  views: {
    type: Number
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
