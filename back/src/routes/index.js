const express = require('express');
const router = express.Router();
const logger = require('../utils/logger')
/* GET home page. */

/*
<looger 사용 예시>
router.get('/', (req, res) => {
  logger.info('GET /');
  res.sendStatus(200);
 }

 router.get('/', (req, res) => {
  logger.error('Error message');
  res.sendStatus(500);
 */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  logger.info("Hello world");
  logger.warn("hello");
});

module.exports = router;
