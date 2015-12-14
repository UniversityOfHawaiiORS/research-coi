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

import * as ConfigController from './controllers/ConfigController';
import * as DisclosureController from './controllers/DisclosureController';
import * as TravelLogController from './controllers/TravelLogController';
import * as ProjectController from './controllers/ProjectController';
import * as FileController from './controllers/FileController';
import * as PIController from './controllers/PIController';
import * as UserController from './controllers/UserController';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authentication from './middleware/authentication';
import apiAuthentication from './middleware/apiAuthentication';
import renderView from './middleware/renderView';
import Log from './Log';
import methodChecker from './middleware/methodChecker';
import ErrorLogger from './middleware/ErrorLogger';
import {COIConstants} from '../COIConstants';
import {NOT_FOUND} from '../HTTPStatusCodes';
import adminRoleCheck from './middleware/adminRoleCheck';
import unauthorized from './middleware/unauthorized';

const DEFAULT_PORT = 8090;

function conditionallyLogRequests(app) {
  if (process.env.LOG_LEVEL <= COIConstants.LOG_LEVEL.INFO) {
    app.use((req, res, next) => {
      let startTime = new Date().getTime();
      res.on('finish', function() {
        let elapsedTime = new Date().getTime() - startTime;
        Log.info(`${req.originalUrl} - ${elapsedTime}ms`);
      });
      next();
    });
  }
}

function configureProxy(app) {
  const TRUST_PROXY = process.env.TRUST_PROXY;
  if (TRUST_PROXY) {
    Log.info(`Using TRUST_PROXY value of ${TRUST_PROXY}`);

    if (TRUST_PROXY.toLowerCase() === 'true') {
      app.set('trust proxy', true);
    }
    else if (TRUST_PROXY.toLowerCase() === 'false') {
      app.set('trust proxy', false);
    }
    else {
      app.set('trust proxy', TRUST_PROXY);
    }
  }
}

export function run() {
  let app = express();
  app.disable('x-powered-by');
  app.set('view engine', 'jade');
  app.set('views', './views');
  configureProxy(app);

  let config;
  try {
    let extensions = require('research-extensions');
    extensions.express(app);
    config = extensions.config;
  } catch (e) {
    Log.info('extensions not found');
  }

  conditionallyLogRequests(app);

  app.use('/coi', express.static('client'));
  app.use('/coi/build', (req, res) => { res.sendStatus(NOT_FOUND); }); // Static files that weren't found

  app.use(methodChecker);
  app.use(cookieParser());

  app.use('/coi/auth', renderView('auth'));
  app.use('/api', apiAuthentication);
  app.use('/coi', authentication);
  app.use('/coi$', renderView('index'));
  app.use('/coi/$', renderView('index'));
  app.use('/coi/archiveview', renderView('index'));
  app.use('/coi/dashboard', renderView('index'));
  app.use('/coi/disclosure', renderView('index'));
  app.use('/coi/travelLog', renderView('index'));
  app.use('/coi/revise', renderView('index'));

  app.use('/coi/admin', adminRoleCheck, renderView('admin/admin'));
  app.use('/coi/config', adminRoleCheck, renderView('admin/config'));
  app.use('/coi', unauthorized);

  app.use(bodyParser.json());
  ConfigController.init(app);
  DisclosureController.init(app);
  TravelLogController.init(app);
  ProjectController.init(app);
  FileController.init(app);
  PIController.init(app);
  UserController.init(app);
  app.use(ErrorLogger);

  let portNumber = config ? config.port : process.env.COI_PORT || DEFAULT_PORT;
  let server = app.listen(portNumber);

  console.log(`Listening on port ${portNumber} in ${app.get('env')} mode`); // eslint-disable-line no-console

  process.on('uncaughtException', function(err) {
    Log.error(`Uncaught exception: ${err}`);
    Log.error(err);
    Log.error('waiting for pending connections to clear');
    server.close(() => {
      Log.error('shutting down');
      process.exit(1); //eslint-disable-line no-process-exit
    });
  });
}
