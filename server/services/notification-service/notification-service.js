/*
 The Conflict of Interest (COI) module of Kuali Research
 Copyright © 2005-2016 Kuali, Inc.

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

import { getCoreTemplateIdByTemplateId } from '../../db/config-db';
import { getDisclosureInfoForNotifications } from '../../db/disclosure-db';

import * as VariableService from './variables-service';

const client = process.env.NODE_ENV === 'test' ?
  require('./mock-notification-client') :
  require('./notification-client') ;

const {
  createDisplayName,
  createNewTemplate,
  updateTemplateData,
  getTemplates,
  getUserInfo,
  sendNotification,
  getAdminRecipients,
  getRequestInfo,
  areNotificationsEnabled
} = client;

const NOTIFICATION_TEMPLATES = {
  SUBMITTED: {
    ID: 1,
    SUBJECT: 'REPLACE WITH DEFAULT',
    BODY: 'REPLACE WITH DEFAULT'
  },
  REVIEW_COMPLETE: {
    ID: 2,
    SUBJECT: 'REPLACE WITH DEFAULT',
    BODY: 'REPLACE WITH DEFAULT'
  },
  NEW_PROJECT: {
    ID: 3,
    SUBJECT: 'REPLACE WITH DEFAULT',
    BODY: 'REPLACE WITH DEFAULT'
  },
  SENT_BACK: {
    ID: 4,
    SUBJECT: 'REPLACE WITH DEFAULT',
    BODY: 'REPLACE WITH DEFAULT'
  },
  REVIEW_ASSIGNED: {
    ID: 5,
    SUBJECT: 'REPLACE WITH DEFAULT',
    BODY: 'REPLACE WITH DEFAULT'
  }
};

export function getDefaults(notificationTemplate) {
  switch(notificationTemplate.templateId) {
    case NOTIFICATION_TEMPLATES.SUBMITTED.ID:
      notificationTemplate.subject = NOTIFICATION_TEMPLATES.SUBMITTED.SUBJECT;
      notificationTemplate.body = NOTIFICATION_TEMPLATES.SUBMITTED.BODY;
      return notificationTemplate;
    case NOTIFICATION_TEMPLATES.REVIEW_COMPLETE.ID:
      notificationTemplate.subject = NOTIFICATION_TEMPLATES.REVIEW_COMPLETE.SUBJECT;
      notificationTemplate.body = NOTIFICATION_TEMPLATES.REVIEW_COMPLETE.BODY;
      return notificationTemplate;
    case NOTIFICATION_TEMPLATES.NEW_PROJECT.ID:
      notificationTemplate.subject = NOTIFICATION_TEMPLATES.NEW_PROJECT.SUBJECT;
      notificationTemplate.body = NOTIFICATION_TEMPLATES.NEW_PROJECT.BODY;
      return notificationTemplate;
    case NOTIFICATION_TEMPLATES.SENT_BACK.ID:
      notificationTemplate.subject = NOTIFICATION_TEMPLATES.SENT_BACK.SUBJECT;
      notificationTemplate.body = NOTIFICATION_TEMPLATES.SENT_BACK.BODY;
      return notificationTemplate;
    case NOTIFICATION_TEMPLATES.REVIEW_ASSIGNED.ID:
      notificationTemplate.subject = NOTIFICATION_TEMPLATES.REVIEW_ASSIGNED.SUBJECT;
      notificationTemplate.body = NOTIFICATION_TEMPLATES.REVIEW_ASSIGNED.BODY;
      return notificationTemplate;
    default:
      notificationTemplate.subject = '';
      notificationTemplate.body = '';
      return notificationTemplate;
  }
}

function cleanTemplate(template) {
  delete template.subject;
  delete template.body;
  delete template.index;
  delete template.editing;
  return template;
}

export async function handleTemplates(dbInfo, hostname, templates) {
  try {
    return templates.map(async template => {
      if (template.active === 1) {
        if (!template.core_template_id) { //eslint-disable-line camelcase
          const coreTemplateId = await createNewTemplate(dbInfo, hostname, template);
          template.core_template_id = coreTemplateId; //eslint-disable-line camelcase
          return cleanTemplate(template);
        }
        await updateTemplateData(dbInfo, hostname, template);
      }

      return cleanTemplate(template);
    });
  } catch(err) {
    Promise.reject(err);
  }
}

export async function populateTemplateData(dbInfo, hostname, notificationTemplates) {
  try {
    const templates = await getTemplates(dbInfo, hostname);
    return notificationTemplates.map(notificationTemplate => {
      const template = templates.find(t => {
        return String(t.id) === String(notificationTemplate.coreTemplateId) ||
          t.displayName === createDisplayName(hostname, notificationTemplate.description);
      });

      if (!template) {
        return getDefaults(notificationTemplate);
      }
      notificationTemplate.subject = template.subject;
      notificationTemplate.body = template.templates.email.text;
      notificationTemplate.coreTemplateId = template.id;
      return notificationTemplate;
    });
  } catch(err) {
    return Promise.reject(err);
  }
}

function createCoreNotification(templateId, variables, creatorId, addresses) {
  return {
    templateId,
    creatorId,
    addresses,
    variables
  };
}

async function getVariablesForSubmitNotification(dbInfo, hostname, disclosureId) {
  const disclosure = await getDisclosureInfoForNotifications(dbInfo, disclosureId);
  disclosure.reporterInfo = await getUserInfo(dbInfo, hostname, disclosure.userId);
  const url = getRequestInfo(dbInfo, hostname).url;

  let variables = VariableService.getDefaultVariables(url);

  variables = VariableService.getDisclosureVariables(disclosure, url, variables);
  return variables;
}

export async function createAndSendSubmitNotification(dbInfo, hostname, authHeader, userInfo, disclosureId) {
  try {
    if (!areNotificationsEnabled(dbInfo)) {
      return Promise.resolve();
    }
    const coreTemplateId = await getCoreTemplateIdByTemplateId(dbInfo, NOTIFICATION_TEMPLATES.SUBMITTED.ID);
    const variables = await getVariablesForSubmitNotification(dbInfo, hostname, disclosureId);
    const adminEmails = await getAdminRecipients(dbInfo, authHeader);
    const notification = createCoreNotification(coreTemplateId, variables, userInfo.id, adminEmails);

    return await sendNotification(dbInfo, hostname, notification);
  } catch (err) {
    Promise.reject(err);
  }
}
