const express = require('express');
const router = express.Router();

const events = [
  {
    id: 1,
    title: 'Wing Wednesday',
    description: '50% off all wing orders every Wednesday night',
    day: 'Every Wednesday',
    time: '5:00 PM - Close',
    recurring: true,
  },
  {
    id: 2,
    title: 'Happy Hour',
    description: '$1 off all draft beers and well drinks',
    day: 'Monday - Friday',
    time: '3:00 PM - 6:00 PM',
    recurring: true,
  },
  {
    id: 3,
    title: 'Trivia Night',
    description: 'Test your knowledge for a chance to win bar tabs and prizes',
    day: 'Every Thursday',
    time: '7:00 PM - 9:00 PM',
    recurring: true,
  },
  {
    id: 4,
    title: 'Live Music Saturday',
    description: 'Live local bands every Saturday night',
    day: 'Every Saturday',
    time: '8:00 PM - 11:00 PM',
    recurring: true,
  },
  {
    id: 5,
    title: 'Sunday Funday',
    description: 'Bottomless mimosas with any brunch entrée',
    day: 'Every Sunday',
    time: '11:00 AM - 3:00 PM',
    recurring: true,
  },
];

router.get('/', (req, res) => {
  res.json(events);
});

module.exports = router;
