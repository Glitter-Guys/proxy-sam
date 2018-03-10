const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port =  process.env.PORT || 3333;
const cors = require('cors')
const request = require('request')

app.use(cors());
app.use(morgan('dev'));
app.use('/event/:eventid', express.static(path.join(__dirname, 'public')));


app.listen(port, () => console.log(`Proxy listening on port ${port}`));

app.use('/api/:eventid/attendees', function(req, res) {
  console.log('attendees request')
 var eventid = req.baseUrl.split('/')[2];
 var attendees = request('http://18.218.58.234/api/' + eventid + '/attendees');
 req.pipe(attendees).pipe(res);
})

app.use('/api/:eventid/details', function(req, res) {
  console.log('detailsRequested')
 var eventid = req.baseUrl.split('/')[2];
 var details = request('http://18.191.1.33/api/' + eventid + '/details');
 req.pipe(details).pipe(res);
})

app.use('/event/api/:eventid/suggestions', function(req, res) {
 var suggestions = request('http://13.59.62.48/event/api/:eventid/suggestions');
 req.pipe(suggestions).pipe(res);
})

app.use('/suggestions', function(req, res) {
 var category = req.url + '&category=Food';
 var search = request('http://13.59.62.48/suggestions' + category);
 req.pipe(search).pipe(res);
})


app.use('/api/:eventid/wherewhen', function(req, res) {
 var eventid = req.baseUrl.split('/')[2];
 var details = request('http://18.217.231.83/api/' + eventid + '/wherewhen/');
 req.pipe(details).pipe(res);
});

app.use('/event/:eventid/icons/clock.svg', function(req, res) {
 var details = request('http://18.217.231.83/icons/clock.svg');
 req.pipe(details).pipe(res);
});

app.use('/event/:eventid/icons/location.svg', function(req, res) {
 var details = request('http://18.217.231.83/icons/location.svg');
 req.pipe(details).pipe(res);
});
