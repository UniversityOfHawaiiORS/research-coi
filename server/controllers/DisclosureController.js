import * as DisclosureDB from '../db/DisclosureDB';
import * as PIReviewDB from '../db/PIReviewDB';
import multer from 'multer';
import Log from '../Log';
import {COIConstants} from '../../COIConstants';

let upload;
try {
  let extensions = require('research-extensions');
  upload = extensions.storage;
}
catch (err) {
  upload = multer({dest: process.env.LOCAL_FILE_DESTINATION || 'uploads/' });
}


export let init = app => {
  /**
    @Role: user
    Can only see disclosures which they submitted
  */
  app.get('/api/coi/archived-disclosures', function(req, res, next) {
    DisclosureDB.getArchivedDisclosures(req.dbInfo, req.userInfo.schoolid)
      .then(disclosures => {
        res.send(disclosures);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only see disclosures which they submitted
  */
  app.get('/api/coi/disclosure-user-summaries', function(req, res, next) {
    DisclosureDB.getSummariesForUser(req.dbInfo, req.userInfo.schoolId)
      .then(disclosures => {
        res.send(disclosures);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only see their own annual disclosure
  */
  app.get('/api/coi/disclosures/annual', function(req, res, next) {
    DisclosureDB.getAnnualDisclosure(req.dbInfo, req.userInfo, req.userInfo.name)
    .then(disclosure => {
      res.send(disclosure);
    })
    .catch(err => {
      Log.error(err);
      next(err);
    });
  });

  /**
    @Role: admin (can see any) or user (can only see their own)
  */
  app.get('/api/coi/disclosures/:id', function(req, res, next){
    DisclosureDB.get(req.dbInfo, req.userInfo, req.params.id)
      .then(disclosure => {
        res.send(disclosure);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: admin
  */
  app.get('/api/coi/disclosure-summaries', function(req, res, next) {
    if (req.userInfo.role !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(403);
      return;
    }

    let sortColumn = 'DATE_SUBMITTED';
    if (req.query.sortColumn) {
      sortColumn = req.query.sortColumn;
    }
    let sortDirection = 'ASCENDING';
    if (req.query.sortDirection) {
      sortDirection = req.query.sortDirection;
    }

    let filters = {};
    if (req.query.filters) {
      try {
        let potentialFilter = decodeURIComponent(req.query.filters);
        potentialFilter = JSON.parse(potentialFilter);
        filters = potentialFilter;
      }
      catch (parseErr) {
        Log.error('invalid filters supplied to disclosure-summaries');
        Log.error(parseErr);
        next('invalid filters supplied to disclosure-summaries');
      }
    }

    let start = 0;
    if (req.query.start && !isNaN(req.query.start)) {
      start = req.query.start;
    }
    DisclosureDB.getSummariesForReview(req.dbInfo, sortColumn, sortDirection, start, filters)
      .then(summaries => {
        res.send(summaries);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: admin
  */
  app.get('/api/coi/disclosure-summaries/count', function(req, res, next) {
    if (req.userInfo.role !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(403);
      return;
    }

    let filters = {};
    if (req.query.filters) {
      try {
        let potentialFilter = decodeURIComponent(req.query.filters);
        potentialFilter = JSON.parse(potentialFilter);
        filters = potentialFilter;
      }
      catch (parseErr) {
        Log.error('invalid filters supplied to disclosure-summaries/count');
        Log.error(parseErr);
        next('invalid filters supplied to disclosure-summaries/count');
      }
    }

    DisclosureDB.getSummariesForReviewCount(req.dbInfo, filters)
      .then(count => {
        res.send(count);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only edit entities which are associated with their disclosure
  */
  app.put('/api/coi/disclosures/:id/financial-entities/:entityId', upload.array('attachments'), function(req, res, next) {
    DisclosureDB.saveExistingFinancialEntity(req.dbInfo, req.userInfo, req.params.entityId, JSON.parse(req.body.entity), req.files)
      .then(financialEntity => {
        res.send(financialEntity);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only add entities to disclosures which are theirs
  */
  app.post('/api/coi/disclosures/:id/financial-entities', upload.array('attachments'), function(req, res, next) {
    DisclosureDB.saveNewFinancialEntity(req.dbInfo, req.userInfo, req.params.id, JSON.parse(req.body.entity), req.files)
      .then(financialEntity => {
        res.send(financialEntity);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only add declarations to disclosures which are theirs
  */
  app.post('/api/coi/disclosures/:id/declarations', function(req, res, next) {
    req.body.disclosure_id = req.params.id; //eslint-disable-line camelcase
    DisclosureDB.saveDeclaration(req.dbInfo, req.userInfo.schoolId, req.params.id, req.body)
      .then(declaration => {
        res.send(declaration);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only edit declarations on disclosures which are theirs
  */
  app.put('/api/coi/disclosures/:id/declarations/:declarationId', function(req, res, next) {
    DisclosureDB.saveExistingDeclaration(req.dbInfo, req.userInfo.schoolId, req.params.id, req.params.declarationId, req.body)
      .then(() => {
        res.sendStatus(202);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only answer questions on disclosures which are theirs
  */
  app.post('/api/coi/disclosures/:id/question-answers', function(req, res, next) {
    DisclosureDB.saveNewQuestionAnswer(req.dbInfo, req.userInfo.schoolId, req.params.id, req.body)
      .then(answer => {
        res.send(answer);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only answer questions on disclosures which are theirs
  */
  app.put('/api/coi/disclosures/:id/question-answers/:questionId', function(req, res, next) {
    DisclosureDB.saveExistingQuestionAnswer(req.dbInfo, req.userInfo.schoolId, req.params.id, req.params.questionId, req.body)
      .then(answer => {
        res.send(answer);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only submit disclosures which are theirs
  */
  app.put('/api/coi/disclosures/:id/submit', function(req, res, next) {
    DisclosureDB.submit(req.dbInfo, req.userInfo, req.params.id)
      .then(() => {
        res.sendStatus(202);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: admin
  */
  app.put('/api/coi/disclosures/:id/approve', function(req, res, next) {
    if (req.userInfo.role !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(403);
      return;
    }

    DisclosureDB.approve(req.dbInfo, req.body, req.userInfo.name, req.params.id)
      .then(() => {
        res.sendStatus(202);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: admin
  */
  app.put('/api/coi/disclosures/:id/reject', function(req, res, next) {
    if (req.userInfo.role !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(403);
      return;
    }

    DisclosureDB.reject(req.dbInfo, req.userInfo.name, req.params.id)
      .then(() => {
        res.sendStatus(202);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: admin
  */
  app.post('/api/coi/disclosures/:id/comments', (req, res, next) => {
    if (req.userInfo.role !== COIConstants.ROLES.ADMIN) {
      res.sendStatus(403);
      return;
    }

    let comment = req.body;

    if (!comment.topicSection ||
        !comment.topicId ||
        comment.visibleToPI === undefined ||
        comment.visibleToReviewers === undefined ||
        !comment.text ||
        isNaN(req.params.id)
       ) {
      next(new Error('invalid comment body'));
    }
    else {
      DisclosureDB.addComment(req.dbInfo, req.userInfo, {
          topicSection: comment.topicSection,
          topicId: comment.topicId,
          visibleToPI: comment.visibleToPI,
          visibleToReviewers: comment.visibleToReviewers,
          text: comment.text,
          disclosureId: req.params.id
        })
        .then(result => {
          res.send(result[0]);
        })
        .catch(err => {
          Log.error(err);
          next(err);
        });
    }
  });

  /**
    @Role: user
    Can only retrieve items if this disclosure is theirs
  */
  app.get('/api/coi/disclosures/:id/pi-review-items', (req, res, next) => {
    PIReviewDB.getPIReviewItems(req.dbInfo, req.userInfo, req.params.id)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        Log.error(err);
        next(err);
      });
  });

  /**
    @Role: user
    Can only delete answers if this disclosure is theirs
  */
  app.delete('/api/coi/disclosures/:id/question-answers', (req, res, next) => {
    let toDelete = [];
    let proposedDeletions = req.body.toDelete !== undefined ? req.body.toDelete : [];

    if (Array.isArray(proposedDeletions)) {
      proposedDeletions.forEach(proposedDeletion => {
        if (Number.isInteger(proposedDeletion)) {
          toDelete.push(proposedDeletion);
        }
      });
    }

    if (toDelete.length > 0) {
      DisclosureDB.deleteAnswers(req.dbInfo, req.userInfo, req.params.id, toDelete)
        .then(() => {
          res.status(204).end();
        })
        .catch(err => {
          Log.error(err);
          next(err);
        });
    }
    else {
      res.status(400).end();
    }
  });
};
