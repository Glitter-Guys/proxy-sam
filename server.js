const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')


app.use(cors());
app.use(morgan('dev'));
app.use('/event/:eventid', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`proxy server running at: http://localhost:${port}`)
});


