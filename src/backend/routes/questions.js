const express = require('express');
const models = require('../models');

const Question = models.Question;
const User = models.User;
const router = express.Router();



// For the endpoint below there are 2 pieces needed on Req.body. A label, and
// content. The user will be taken from req.user which exists because of the
// session. Another thing to note is that the rest of the question object defaults
// to the values we put in our model.


router.post('/questions/new', (req, res) => {
  const question = new Question({
    subject: req.body.label,
    asker: req.user.id,
    content: req.body.content
  });
  question.save()
  .then(newQuestion =>
    res.json({
      success: true,
      newQuestion
    })
  )
  .catch(err => res.send(err));
});


router.post('/questions/remove', (req, res) => {
  const id = req.body.id;
  Question.findById(id)
  .remove()
  .then(() => res.json({ success: true }))
  .catch(err => res.send(err));
});

// The logic below in theory should pull the questions that are the hottest.
// Currently this means just pulling the oldest questions, but in the future
// we should augment this function to be either logorithmic, or based on a
// desired hotness distribution. The bounty is not saved on the question object
// but rather calculated on the front end. Average response time or # of users online
// could also factor into the hotness function.

const questionLimit = 20;

router.get('/questions/hot', (req, res) => {
  const userId = req.user.id;
  User.findById(userId)
  .then((user) => {
    console.log(user);
    // The map function below creates an array that can be passed into the $or logic
    // in order to return all questions that match any of the users interests
    const interests = user.interests;
    const subjects = interests.map((subject) => {
      const obj = {};
      obj.subject = subject;
      return obj;
    });
    Question.find({ $or: subjects })
    .sort({ date: 1 })
    .limit(questionLimit) // This limits the amount of questions mongo gives us to 20
    .then((questions) => {
      const millisecondsInTenSeconds = 10000;
      const hotQuestions = questions.map((question) => {
        const bounty = Math.floor(
          (Date.now() - Date.parse(question.createdTime)) / millisecondsInTenSeconds
        );
        const newQuestion = question;
        newQuestion.bounty = bounty;
        return newQuestion;
      });
      res.json({
        success: true,
        questions: hotQuestions
      });
    }
    )
    .catch(err => res.send(err));
  });
});

router.get('/questions/recent', (req, res) => {
  const userId = req.user.id;
  User.findById(userId)
  .then((user) => {
    console.log(user);
    // The map function below creates an array that can be passed into the $or logic
    // in order to return all questions that match any of the users interests
    const interests = user.interests;
    const subjects = interests.map((subject) => {
      const obj = {};
      obj.subject = subject;
      return obj;
    });
    Question.find({ $or: subjects })
    .sort({ date: -1 })
    .limit(questionLimit) // This limits the amount of questions mongo gives us to 20
    .then((questions) => {
      const millisecondsInTenSeconds = 10000;
      const hotQuestions = questions.map((question) => {
        const bounty = Math.floor(
          (Date.now() - Date.parse(question.createdTime)) / millisecondsInTenSeconds
        );
        const newQuestion = question;
        newQuestion.bounty = bounty;
        return newQuestion;
      });
      res.json({
        success: true,
        questions: hotQuestions
      });
    }
    )
    .catch(err => res.send(err));
  });
});

module.exports = router;
