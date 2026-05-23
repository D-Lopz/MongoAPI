'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var project_routes      = require('./routers/project');
var docentes_routes     = require('./routers/docentes');
var evaluaciones_routes = require('./routers/evaluaciones');
var stats_routes        = require('./routers/stats');
var auth_routes         = require('./routers/auth');

// ← CORS primero, antes de todo
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth',         auth_routes);
app.use('/api/docentes',     docentes_routes);
app.use('/api/evaluaciones', evaluaciones_routes);
app.use('/api/stats',        stats_routes);
app.use('/api',              project_routes);

module.exports = app;