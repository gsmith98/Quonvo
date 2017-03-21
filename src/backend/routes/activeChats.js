const express = require('express');
const models = require('../models');
const ActiveChat = models.ActiveChat;
const User = models.User;
const Message = models.Message;

const router = express.Router();

// Routes go here

// Route to create a chat object when a question is clicked on

// Make sure to add socket creation to this as well
router.post('/activeChats/new', (req, res) => {
  const user = req.user;
  const question = req.body.question; // Thi is the content of the question
  const newChat = new ActiveChat({
    // The question id is saved from when the backend gave the question objects
    question: req.body.questionId,
    // The bounty is calculated on the frontend and saved on this chat object
    bounty: req.body.bounty,
    // The asker is on the question object
    asker: req.body.asker,
    answerer: user.id
  });
  const newMessage = new Message({
    content: question,
    sender: req.body.asker,
    receipient: user.id
  });

  newChat.messages.push(newMessage.id); // Add the new message to the chat
  user.activeChats.push(newChat.id); // Add the new chat to the user
  let response = {};
  newChat.save()
  .then((chat) => {
    response = chat;
  })
  .then(() => newMessage.save())
  .then(() => user.save())
  .then(() => res.json({      // The socket creation would probably happen in this .then
    success: true,
    chat: response
  }))
  .catch(err => res.send(err));
});

module.exports = router;
