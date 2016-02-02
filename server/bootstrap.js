/*
    The Conflict of Interest (COI) module of Kuali Research
    Copyright © 2015 Kuali, Inc.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
*/

/* eslint-disable no-var, prefer-arrow-callback, prefer-template, no-console */

require('babel-register');
require('babel-polyfill');
var app = require('./app');
var Log = require('./Log').default;

var application = app.run();
var portNumber = application.get('portNumber');
var server = application.listen(portNumber);

console.log('Listening on port ' + portNumber + ' in ' + application.get('env') + ' mode');

process.on('uncaughtException', function(err) {
  Log.error('Uncaught exception: ' + err);
  Log.error(err);
  Log.error('waiting for pending connections to clear');
  server.close(function() {
    Log.error('shutting down');
    process.exit(1);
  });
});