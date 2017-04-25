const express = require('express');
const models = require('../models');

const router = express.Router();
const Question = models.Question;
const ArchivedChat = models.ArchivedChat;
const limit = 10;

router.post('/archivedChats/new', (req, res) => {
  console.log('i got into this chat');
  const messages = req.body.messages;
  const questionId = req.body.questionId;
  const askerHandle = req.body.askerHandle;
  const answererHandle = req.body.answererHandle;
  const rating = req.body.rating;
  const questionAnswered = req.body.questionAnswered;
  let asker;
  let answerer;
  let question;
  let questionSubject;
  let newQuestion = false;
  let archive;

  Question.findById(questionId)
  .then((foundQuestion) => {
    console.log('i got here');
    asker = foundQuestion.asker;
    answerer = foundQuestion.answerer;
    question = foundQuestion.content;
    questionSubject = foundQuestion.subject;

    const archivedChat = new ArchivedChat({
      messages,
      questionId,
      question,
      asker,
      answerer,
      askerHandle,
      answererHandle,
      rating,
      questionAnswered,
      questionSubject
    });
    return archivedChat.save();
  })
  .then((archivedChat) => {
    archive = archivedChat;
    if (!questionAnswered) {
      const questionAgain = new Question({
        subject: questionSubject,
        asker,
        content: question,
        handle: askerHandle
      });
      newQuestion = true;
      return Promise.all([Question.remove({ _id: questionId }), questionAgain.save()]);
    }
    console.log('got to the second part of the if statement');
    return Question.remove({ _id: questionId });
  })
  .then((returnValue) => {
    res.json({
      success: true,
      questionResubmitted: newQuestion,
      question: returnValue,
      archive,
    });
  })
  .catch(err => res.send(err));
});

router.get('./archivedChats/get', (req, res) => {
  const subject = req.query.subject;
  const skip = req.query.skip;

  ArchivedChat.find({ questionSubject: subject })
  .sort({ rating: -1 })
  .skip(skip * limit)
  .limit(limit)
  .then((archives) => {
    res.json({
      success: true,
      archives,
    });
  });
});

module.exports = router;
