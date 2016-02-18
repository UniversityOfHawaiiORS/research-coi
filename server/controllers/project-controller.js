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

import * as ProjectDB from '../db/project-db';
import Log from '../log';
import { ROLES } from '../../coi-constants';
const { ADMIN } = ROLES;
import { allowedRoles } from '../middleware/role-check';
import { filterProjects } from '../services/project-service/project-service';

export const init = app => {
  app.post('/api/coi/projects', allowedRoles(ADMIN), (req, res, next) => {
    ProjectDB.saveProjects(req.dbInfo, req.body)
      .then(projects => {
        res.send(projects);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    Should only return projects associated with the given user
  */
  app.get('/api/coi/projects', allowedRoles('ANY'), async (req, res, next) => {
    try {
      const projects = await ProjectDB.getProjects(req.dbInfo, req.userInfo.schoolId);
      if (req.query.filter) {
        const result = await filterProjects(req.dbInfo, projects);
        res.send(result);
      } else {
        res.send(projects);
      }
    } catch(err) {
      Log.error(err);
      next(err);
    }
  });

  app.get('/api/coi/project-disclosure-statuses/:sourceId/:projectId', allowedRoles(ADMIN), (req, res, next) => {
    ProjectDB.getProjectStatuses(req.dbInfo, req.params.sourceId, req.params.projectId)
      .then(statuses => {
        res.send(statuses);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  app.get('/api/coi/project-disclosure-statuses/:sourceId/:projectId/:personId', allowedRoles(ADMIN), (req, res, next) => {
    ProjectDB.getProjectStatus(req.dbInfo, req.params.sourceId, req.params.projectId, req.params.personId)
      .then(status => {
        res.send(status);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });
};
