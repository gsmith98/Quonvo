const express = require('express');
const models = require('../models');

const router = express.Router();
const Question = models.Question;
const ArchivedChat = models.ArchivedChat;

router.post('/archivedChats/new', (req, res) => {
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
  let archivedChat;

  Question.findById(questionId)
  .then((foundQuestion) => {
    console.log('i got here');
    asker = foundQuestion.asker;
    answerer = foundQuestion.answerer;
    question = foundQuestion.content;
    questionSubject = foundQuestion.subject;
    console.log(questionSubject);
    archivedChat = new ArchivedChat({
      messages,
      questionId,
      question,
      asker,
      answerer,
      askerHandle,
      answererHandle,
      rating,
      questionAnswered,
      questionSubject,
    });
    return archivedChat.save();
  })
  .then(() => {
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
    return Question.remove({ _id: questionId });
  })
  .then((returnValue) => {
    res.json({
      success: true,
      questionResubmitted: newQuestion,
      question: returnValue,
      archivedChat,
    });
  })
  .catch(err => res.send(err));
});

router.get('/archivedChats/get', (req, res) => {
  const subject = req.query.subject;
  const pageNumber = req.query.skip;
  const limit = req.query.limit;
  ArchivedChat.find({ questionSubject: subject })
  .sort({ rating: -1 })
  .skip(pageNumber * limit)
  .limit(limit)
  .then((archives) => {
    res.json({
      success: true,
      archives,
    });
  });
});

module.exports = router;
