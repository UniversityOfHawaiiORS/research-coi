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

import { getAuthToken } from '../auth-service/auth-service';
import request from 'superagent';
import { getRequiredProjectTypes, getRequiredProjectStatuses, getRequiredProjectRoles } from '../../db/config-db';
import Log from '../../log';
import cache from '../../lru-cache';

let getAuthorizationInfo;
try {
  const extensions = require('research-extensions').default;
  getAuthorizationInfo = extensions.getAuthorizationInfo;
} catch (e) {
  getAuthorizationInfo = (dbInfo) => { //eslint-disable-line no-unused-vars
    return {
      researchCoreUrl: process.env.RESEARCH_CORE_URL || 'https://uit.kuali.dev/res',
      coiHierarchy: process.env.COI_HIERARCHY
    };
  };
}

const END_POINTS = {
  PROPOSAL_AWARD_IP_ROLES: '/research-common/api/v1/prop-award-person-roles/',
  PROPOSAL_STATUS: '/propdev/api/v1/proposal-states/',
  AWARD_STATUS: '/award/api/v1/award-statuses/',
  IP_STATUS: '/instprop/api/v1/proposal-statuses/',
  IRB_ROLES: '/irb/api/v1/protocol-person-roles/',
  IRB_STATUS: '/irb/api/v1/protocol-statuses/',
  IACUC_ROLES: '/iacuc/api/v1/iacuc-protocol-person-roles/',
  IACUC_STATUS: '/iacuc/api/v1/iacuc-protocol-statuses/',
  SPONSOR_HIERARCHY: '/research-common/api/v1/sponsor-hierarchies/?hierarchyName='
};

const REQUIRED_SPONSORS_KEY = 'requiredSponsors';

async function callEndPoint(researchCoreUrl, authHeader, endPoint) {
  try {
    const response = await request.get(`${researchCoreUrl}${endPoint}`)
      .set('Authorization', `Bearer ${getAuthToken(authHeader)}`);

    if (response.ok) {
      return Promise.resolve(response.body);
    }
    return Promise.resolve([]);
  } catch(err) {
    Log.error(`cannot access ${researchCoreUrl}${endPoint}`);
    return Promise.resolve([]);
  }
}

export function getSourceRoleCd(projectTypeCd, role) {
  switch (projectTypeCd) {
    case '3':
      return role.protocolPersonRoleId;
    case '4':
      return role.protocolPersonRoleId;
    default:
      return role.code;
  }
}

export function getSourceStatusCd(projectTypeCd, status) {
  switch (projectTypeCd) {
    case '2':
      return status.proposalStatusCode;
    case '3':
      return status.protocolStatusCode;
    case '4':
      return status.protocolStatusCode;
    case '5':
      return status.statusCode;
    default:
      return status.code;
  }
}

/*
  Proposal, Award, and Institutional Proposal can have multiple roles mapped to the same
  role code.  When that occurs we only pull in the role code once and change the description to
  include all the descriptions from roles that had that role code.
*/
export function filterProposalRoles(roles) {
  const roleMap = {};
  roles.forEach(role => {
    if (roleMap[role.sourceRoleCd] === undefined) {
      role.descriptions = [role.description];
      roleMap[role.sourceRoleCd] = role;
    } else if (!roleMap[role.sourceRoleCd].descriptions.includes(role.description)) {
      roleMap[role.sourceRoleCd].descriptions.push(role.description);
    }
  });

  const filteredRoles = [];
  for (const role in roleMap) {
    const filteredRole = roleMap[role];
    if (filteredRole.descriptions.length > 1) {
      filteredRole.description = filteredRole.descriptions.join(', ');
    }
    filteredRole.descriptions = undefined;
    filteredRoles.push(filteredRole);
  }
  return filteredRoles;
}

function filterRoles(roles, projectTypeCd) {
  switch (projectTypeCd) {
    case '3':
      return roles;
    case '4':
      return roles;
    default:
      return filterProposalRoles(roles);
  }
}

async function prepareProjectData(dbInfo, authHeader, projectTypeCd, roleEndPoint, statusEndPoint) {
  try {
    const authInfo = getAuthorizationInfo(dbInfo);
    const monolithProjectRoles = await callEndPoint(authInfo.researchCoreUrl, authHeader, roleEndPoint);
    const unfilteredRoles = monolithProjectRoles.map(monolithRole => {
      return {
        projectTypeCd,
        sourceRoleCd: String(getSourceRoleCd(projectTypeCd, monolithRole)),
        description: monolithRole.description,
        reqDisclosure: 0
      };
    });

    const roles = filterRoles(unfilteredRoles, projectTypeCd);

    const monolithStatuses = await callEndPoint(authInfo.researchCoreUrl, authHeader, statusEndPoint);
    const statuses = monolithStatuses.map(monolithStatus => {
      return {
        projectTypeCd,
        sourceStatusCd: String(getSourceStatusCd(projectTypeCd, monolithStatus)),
        description: monolithStatus.description,
        reqDisclosure: 0
      };
    });
    return Promise.resolve({roles, statuses});
  } catch(err) {
    return Promise.reject(err);
  }
}

export async function getProjectData(dbInfo, authHeader, projectTypeCd) {
  try {
    switch (projectTypeCd) {
      case '1': //proposal
        return await prepareProjectData(dbInfo, authHeader, projectTypeCd, END_POINTS.PROPOSAL_AWARD_IP_ROLES, END_POINTS.PROPOSAL_STATUS);
      case '2': //institutional proposal
        return await prepareProjectData(dbInfo, authHeader, projectTypeCd, END_POINTS.PROPOSAL_AWARD_IP_ROLES, END_POINTS.IP_STATUS);
      case '3': //irb
        return await prepareProjectData(dbInfo, authHeader, projectTypeCd, END_POINTS.IRB_ROLES, END_POINTS.IRB_STATUS);
      case '4': //iacuc
        return await prepareProjectData(dbInfo, authHeader, projectTypeCd, END_POINTS.IACUC_ROLES, END_POINTS.IACUC_STATUS);
      case '5': //award
        return await prepareProjectData(dbInfo, authHeader, projectTypeCd, END_POINTS.PROPOSAL_AWARD_IP_ROLES, END_POINTS.AWARD_STATUS);
      default:
        return Promise.resolve({roles: [], statuses: []});
    }
  } catch(err) {
    return Promise.reject(err);
  }
}

async function getRequiredSponsors(researchCoreUrl, coiHierarchy, authHeader) {
  try {
    if (!coiHierarchy) {
      return Promise.resolve();
    }

    let requiredSponsors = cache.get(REQUIRED_SPONSORS_KEY);

    if (requiredSponsors) {
      return Promise.resolve(requiredSponsors);
    }
    const response = await request.get(`${researchCoreUrl}${END_POINTS.SPONSOR_HIERARCHY}${coiHierarchy}`)
      .set('Authorization', `Bearer ${getAuthToken(authHeader)}`);

    requiredSponsors = response.body.map(sponsor => {
      return sponsor.sponsorCode;
    });

    cache.set(REQUIRED_SPONSORS_KEY, requiredSponsors);

    return Promise.resolve(requiredSponsors);
  } catch(err) {
    return Promise.reject(`cannot access ${researchCoreUrl}${END_POINTS.SPONSOR_HIERARCHY}${coiHierarchy}`);
  }
}

async function getRequirements(dbInfo, authHeader) {
  const authInfo = getAuthorizationInfo(dbInfo);
  const requirements = {};
  requirements.types = await getRequiredProjectTypes(dbInfo);
  requirements.roles = await getRequiredProjectRoles(dbInfo);
  requirements.statuses = await getRequiredProjectStatuses(dbInfo);
  requirements.sponsors = process.env.NODE_ENV === 'test' ?
    ['000340','000500'] :
    await getRequiredSponsors(authInfo.researchCoreUrl, authInfo.coiHierarchy, authHeader);
  return requirements;
}

export function isRequired(requirements, project) {
  const isTypeRequired = requirements.types.findIndex(type => type.typeCd == project.typeCd) > -1; // eslint-disable-line eqeqeq
  const isRoleRequired = requirements.roles.findIndex(role => {
    return role.projectTypeCd == project.typeCd && role.sourceRoleCd == project.roleCd; // eslint-disable-line eqeqeq
  }) > -1;
  const isStatusRequired = requirements.statuses.findIndex(status => {
    return status.projectTypeCd == project.typeCd && status.sourceStatusCd == project.statusCd; // eslint-disable-line eqeqeq
  }) > -1;
  const isSponsorRequired = requirements.sponsors ? requirements.sponsors.includes(project.sponsorCd) : true;

  return isTypeRequired && isRoleRequired && isStatusRequired && isSponsorRequired;
}

export async function filterProjects(dbInfo, projects, authHeader) {
  try {
    const requirements = await getRequirements(dbInfo, authHeader);
    const result = projects.filter(project => {
      return isRequired(requirements, project);
    });
    return Promise.resolve(result);
  } catch(err) {
    return Promise.reject(err);
  }
}

export async function isProjectRequired(dbInfo, project, authHeader) {
  try {
    const requirements = await getRequirements(dbInfo, authHeader);
    return isRequired(requirements, project);
  } catch(err) {
    return Promise.reject(err);
  }
}