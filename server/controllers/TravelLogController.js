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

import * as TravelLogDB from '../db/TravelLogDB';
import Log from '../Log';

export let init = app => {
  /**
    @Role: user
    Can only see travel logs associated with their entities
  */
  app.get('/api/coi/travel-log-entries', function(req, res, next) {
    let sortColumn = 'name';
    if (req.query.sortColumn) {
      sortColumn = req.query.sortColumn;
    }
    let sortDirection = 'ASCENDING';
    if (req.query.sortDirection) {
      sortDirection = req.query.sortDirection;
    }
    TravelLogDB.getTravelLogEntries(req.dbInfo, req.userInfo.schoolId, sortColumn, sortDirection)
      .then(travelLog => {
        res.send(travelLog);
      })
    .catch(err => {
      Log.error(err);
      next(err);
    });

  });

  /**
   @Role: user
   Can only add travel logs associated with their entities
   */
  app.post('/api/coi/travel-log-entries', function(req, res, next) {
    TravelLogDB.createTravelLogEntry(req.dbInfo, req.body, req.userInfo)
      .then(travelLog => {
        res.send(travelLog);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });
};
