'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');
const { route } = require('../app');

var router = express.Router();

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/edit-project/:id?', ProjectController.updateProject);
router.delete('/delete-project/:id?', ProjectController.deleteProject);

module.exports = router;