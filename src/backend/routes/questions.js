const express = require('express');
const models = require('../models');

const Question = models.Question;
const router = express.Router();
console.log('I got to questions')

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

module.exports = router;
