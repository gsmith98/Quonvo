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

router.get('/questions/hot', (req, res) => {
  const userId = req.user.id;
  const questionLimit = 20;
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
    .sort({ bounty: -1 }) // This sorts the questions in descending order of bounty
    .limit(questionLimit) // This limits the amount of questions mongo gives us to 20
    .then(hotQuestions =>
      res.json({
        success: true,
        questions: hotQuestions
      })
    )
    .catch(err => res.send(err));
  });
});


router.get('/questions/recent', (req, res) => {
  const userId = req.user.id;
  const questionLimit = 20;
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
    .sort({ createdTime: -1 }) // This sorts the questions in descending order time
    .limit(questionLimit) // This limits the amount of questions mongo gives us to 20
    .then(hotQuestions =>
      res.json({
        success: true,
        questions: hotQuestions
      })
    )
    .catch(err => res.send(err));
  });
});
module.exports = router;
