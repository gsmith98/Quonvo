const express = require('express');
const models = require('../models');
const Chat = require('../models').ActiveChat;
const Message = require('../models').Message;

const router = express.Router();

router.post('/messages/new', (req, res) => {
  // Expecting the chatId and the content of the message
  const content = req.body.content;
  const chatId = req.body.chatId;
  let recipient;
  let sender;
  let message;
  Chat.findById(chatId)
  .then((chat) => {
    if (req.user.id === chat.asker) {
      recipient = chat.answerer;
      sender = chat.asker;
    } else {
      recipient = chat.asker;
      sender = chat.answerer;
    }
    const newMessage = new Message({
      content,
      sender,
      recipient,
    });
    console.log(newMessage);
    chat.messages.push(newMessage.id);
    message = newMessage;
    return Promise.all([chat.save(), message.save()]);
  })
  .then(() => {
    const userSockets = req.app.settings.userSockets;
    const func = (userSocket) => {
      userSocket.emit('newMessage', message);
    };
    userSockets[recipient].forEach(func);
    res.json({
      success: true,
      message,
    });
  })
  .catch(err => res.send(err.message));
});
// Routes go here

module.exports = router;
