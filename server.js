const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running on port ${process.env.PORT || 3000}!`);
});
