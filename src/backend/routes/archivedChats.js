const express = require('express');
const models = require('../models');

const ActiveChat = models.ActiveChat;
const ArchivedChat = models.ArchivedChat;
const User = models.User;
const Question = models.Question;

const router = express.Router();

// This route is for if the question is not thrown back in
router.post('/archivedChats/new', (req, res) => {
  const chatId = req.body.chat;
  const rating = req.body.rating;
  let archive;
  console.log('i got here 1')
  ActiveChat.findById(chatId)
  .populate('messages answerer asker') // TODO Not sure if this works. Trying to populate a whole array
  .then((chat) => {
    console.log('i got here 2')
    const answerer = chat.answerer;
    const asker = chat.asker;
    const messages = chat.messages.map((message) => {
      let askerBoolean = false;
      if (message.sender.id === asker.id) {
        console.log('i got here 3')
        askerBoolean = true;
      }
      console.log('i got here 4')
      return {
        content: message.content,
        asker: askerBoolean
      };
    });
    console.log('hi', messages);
    const bounty = chat.bounty;
    console.log('i got here 5')
    archive = new ArchivedChat({
      rating: req.body.rating,
      question: messages[0].content,
      answerer: chat.answerer, // Change this to name after testing
      messages,
    });
    const questionId = chat.question;
    asker.questionsAsked.push(archive.id);
    answerer.rating += (bounty * rating); // Super simple formula that we will end up changing.
    return Promise.all(
      [asker.save(), answerer.save(), archive.save(), Question.remove({ _id: questionId })]
    );
  })
  .then(() => res.json({
    success: true,
    archivedChat: archive
  }))
  .catch(err => res.send(err));
});

module.exports = router;
