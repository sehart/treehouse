'use strict';

var express = require('express');
var router = express.Router();

// GET /questions
router.get('/', function(req, res) {
	res.json({response: "You sent me a GET request"});	
})

// POST /questions
router.post('/', function(req, res) {
	res.json({
		response: "You sent me a POST request",
		body: req.body
	});	
})

// GET /questions/:id
router.get('/:qid', function(req, res) {
	res.json({
		response: "You sent me a GET request for ID " + req.params.qid
	});	
})

// POST /questions/:qid/answers
router.post('/:qid/answers', function(req, res) {
	res.json({
		response: "You sent me a POST request to /answers",
		questionId: req.params.qid,
		body: req.body
	});	
})

// PUT /questions/:qid/answers/:aid
router.put('/:qid/answers/:aid', function(req, res) {
	res.json({
		response: "You sent me a PUT request to /answers",
		questionId: req.params.qid,
		answerId: req.params.aid,
		body: req.body
	});	
})

// POST /questions/:qid/answers/:aid
router.delete('/:qid/answers/:aid', function(req, res) {
	res.json({
		response: "You sent me a DELETE request to /answers",
		questionId: req.params.qid,
		answerId: req.params.aid,
	});	
})

// POST /questions/:qid/answers/:aid/vote-up
// POST /questions/:qid/answers/:aid/vote-down
router.post('/:qid/answers/:aid/vote-:dir', function(req, res, next) {
		if (req.params.dir.search(/^(up|down)$/) === -1) {
			var err = new Error('Not Found');
			err.status = 404;
			next(err);	
		} else {
			next();
		}
	}, function(req, res) {
		res.json({
			response: "You sent me a POST request to /vote-" + req.params.dir,
			questionId: req.params.qid,
			answerId: req.params.aid,
			body: req.body,
			vote: req.params.dir
		});	
	})


module.exports = router;