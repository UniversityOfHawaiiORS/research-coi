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
import * as AdditionalReviewerDB from '../db/AdditionalReviewerDB';
import Log from '../Log';
import { COIConstants } from '../../COIConstants';
import { OK, FORBIDDEN } from '../../HTTPStatusCodes';

export const init = app => {
  /**
   @Role: admin
   */
  app.post('/api/coi/additional-reviewers', (req, res, next) => {
    if (req.userInfo.coiRole !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(FORBIDDEN);
      return;
    }

    AdditionalReviewerDB.createAdditionalReviewer(req.dbInfo, req.body).then(result => {
      res.send(result);
    })
    .catch(err => {
      Log.error(err);
      next(err);
    });
  });

  /**
   @Role: admin
   */
  app.delete('/api/coi/additional-reviewers/:id', (req, res, next) => {
    if (req.userInfo.coiRole !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(FORBIDDEN);
      return;
    }

    AdditionalReviewerDB.deleteAdditionalReviewer(req.dbInfo, req.params.id).then(() => {
      res.sendStatus(OK);
    })
    .catch(err => {
      Log.error(err);
      next(err);
    });
  });
};