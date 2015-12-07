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

import React from 'react';
import {merge} from '../../merge';
import {AppHeader} from '../AppHeader';
import {Sidebar} from './Sidebar';
import {DisclosureHeader} from './DisclosureHeader';
import {DisclosureStore} from '../../stores/DisclosureStore';
import {DisclosureActions} from '../../actions/DisclosureActions';
import {COIConstants} from '../../../../COIConstants';
import {Questionnaire} from './Questionnaire/Questionnaire';
import {QuestionnaireSummary} from './QuestionnaireSummary/QuestionnaireSummary';
import {ManualEvent} from './Manual/ManualEvent';
import {Relationships} from './Projects/Relationships';
import {Entities} from './Entities/Entities';
import {Certify} from './Certification/Certify';
import {NavSidebar} from './NavSidebar';
const STEP = COIConstants.DISCLOSURE_STEP;

export class Disclosure extends React.Component {
  constructor(props) {
    super(props);

    // Set up steps for the sidebar
    this.steps = [
      {label: 'Questionnaire', value: STEP.QUESTIONNAIRE_SUMMARY},
      {label: 'Financial Entities', value: STEP.ENTITIES}
    ];
    if (props.disclosuretype && props.disclosuretype.toLowerCase() === 'manual') {
      this.steps.push({label: 'Manual Event', value: STEP.MANUAL});
    }
    else {
      this.steps.push({label: 'Project Declarations', value: STEP.PROJECTS});
    }
    this.steps.push({label: 'Certification', value: STEP.CERTIFY});

    let storeState = DisclosureStore.getState();
    this.state = {
      percent: 0,
      applicationState: storeState.applicationState,
      entities: storeState.entities,
      projects: storeState.projects,
      declarations: storeState.declarations,
      files: storeState.files
    };

    this.onChange = this.onChange.bind(this);
  }

  undefinedProjectRelationExists(entities, projects, relations) {
    if (!entities || !projects) {
      return false;
    }
    else if (!relations && (entities.length > 0 || projects.length > 0)) {
      return true;
    }

    let undefinedFound = false;
    entities.forEach(entity => {
      projects.forEach(project => {
        let existingRelation = relations.find(relation => {
          return relation.finEntityId === entity.id &&
            (
              relation.projectId === project.id
            );
        });

        if (!existingRelation) {
          undefinedFound = true;
        }
      });
    });

    return undefinedFound;
  }

  undefinedManualRelationExists(entities, disclosure, relations) {
    if (!entities || !disclosure) {
      return false;
    }
    else if (!relations && entities.length > 0) {
      return true;
    }

    let undefinedFound = false;
    entities.forEach(entity => {
      let existingRelation = relations.find(relation => {
        return relation.finEntityId === entity.id && relation.manualId === disclosure.projectId;
      });

      if (!existingRelation) {
        undefinedFound = true;
      }
    });

    return undefinedFound;
  }

  incompleteEntityExists(entities) {
    if (!entities) {
      return false;
    }

    let incompleteEntity = false;
    entities.filter(entity=> {
      return entity.active === 1;
    })
    .forEach(entity => {
      if (!DisclosureStore.entityInformationStepComplete(entity.id)
      || !DisclosureStore.entityRelationshipsAreSubmittable(entity.id)) {
        incompleteEntity = true;
      }
    });
    return incompleteEntity;
  }
  componentDidMount() {
    DisclosureStore.listen(this.onChange);
    let disclosureType = this.props.location.query.type;
    DisclosureActions.loadDisclosureData(disclosureType);
  }

  componentWillUnmount() {
    DisclosureStore.unlisten(this.onChange);
  }

  onChange() {
    let storeState = DisclosureStore.getState();
    this.setState({
      applicationState: storeState.applicationState,
      entities: storeState.entities,
      projects: storeState.projects,
      declarations: storeState.declarations,
      files: storeState.files
    });
  }

  render() {
    let currentDisclosureId = this.state.applicationState.currentDisclosureState.disclosure.id;
    let currentDisclosureState = this.state.applicationState.currentDisclosureState;
    let currentDisclosureStep = currentDisclosureState.step;
    let currentQuestion = currentDisclosureState.question;

    let styles = {
      container: {
        padding: '0',
        minHeight: 100
      },
      header: {
        boxShadow: '0 1px 6px #D1D1D1',
        zIndex: 10,
        position: 'relative'
      },
      content: {
        verticalAlign: 'top',
        width: '80%',
        overflow: 'auto',
        backgroundColor: '#eeeeee'
      },
      middle: {
        width: '75%',
        zIndex: 10,
        position: 'relative',
        overflowY: 'hidden'
      },
      sidebar: {
        minWidth: 300,
        boxShadow: '2px 1px 8px #D5D5D5',
        zIndex: 9,
        position: 'relative'
      }
    };

    let stepNumber = 0;
    let percent = 0;
    let heading;
    let currentStep;
    let nextDisabled;
    const QUESTIONNAIRE_PERCENTAGE = 25;
    let previousLinkLabel = 'PREVIOUS STEP';
    let showPreviousLink = true;
    let showNextLink = (
      currentDisclosureStep !== STEP.QUESTIONNAIRE &&
      currentDisclosureStep !== STEP.CERTIFY &&
      !nextDisabled
    );

    switch (currentDisclosureStep) {
      case STEP.QUESTIONNAIRE:
        if (window.config.questions.screening) {
          percent = Math.floor(((currentQuestion - 1) / window.config.questions.screening.length) * QUESTIONNAIRE_PERCENTAGE);
        }

        let question = currentQuestion;
        currentStep = (
          <Questionnaire
            questions={window.config.questions.screening}
            answers={currentDisclosureState.disclosure.answers}
            currentquestion={question}
            disclosureid={currentDisclosureId}
            instructionsShowing={this.state.applicationState.instructionsShowing}
          />
        );
        heading = 'Questionnaire';
        previousLinkLabel = 'PREVIOUS QUESTION';
        showPreviousLink = currentQuestion > 1;

        break;
      case STEP.QUESTIONNAIRE_SUMMARY:
        percent = QUESTIONNAIRE_PERCENTAGE;
        currentStep = (
          <QuestionnaireSummary
            questions={window.config.questions.screening}
            instructionsShowing={this.state.applicationState.instructionsShowing}
            answers={this.state.applicationState.currentDisclosureState.disclosure.answers}
          />
        );
        heading = 'Questionnaire';
        break;
      case STEP.ENTITIES:
        stepNumber = 1;
        const ENTITIES_PERCENTAGE = 50;
        percent = ENTITIES_PERCENTAGE;
        currentStep = (
          <Entities
            applicationState={this.state.applicationState}
            entities={this.state.entities}
            inProgress={this.state.applicationState.entityInProgress}
            instructionsShowing={this.state.applicationState.instructionsShowing}
          />
        );
        nextDisabled = this.incompleteEntityExists(this.state.entities);
        heading = 'Financial Entities';
        break;
      case STEP.PROJECTS:
        stepNumber = 2;
        const PROJECTS_PERCENTAGE = 75;
        percent = PROJECTS_PERCENTAGE;
        let disclosureType = this.props.location.query.type;
        if (disclosureType === COIConstants.DISCLOSURE_TYPE.MANUAL) {
          let disclosure = this.state.applicationState.currentDisclosureState.disclosure;
          currentStep = (
            <ManualEvent
              step={this.state.applicationState.manualStep}
              disclosure={disclosure}
              type={disclosure.manualType}
              entities={this.state.entities}
              relations={this.state.declarations}
              declarationStates={this.state.applicationState.declarationStates}
              instructionsShowing={this.state.applicationState.instructionsShowing}
            />
          );
          heading = 'Manual Event';
          nextDisabled = this.undefinedManualRelationExists(
            this.state.entities,
            disclosure,
            this.state.declarations
          );
        }
        else {
          let activeEntities = this.state.entities.filter(entity => entity.active);
          currentStep = (
            <Relationships
              projects={this.state.projects}
              entities={activeEntities}
              declarations={this.state.declarations}
              declarationStates={this.state.applicationState.declarationStates}
              view={this.state.applicationState.declarationView}
              declarationTypes={window.config.declarationTypes}
              instructionsShowing={this.state.applicationState.instructionsShowing}
            />
          );
          heading = 'Project Declarations';
          nextDisabled = this.undefinedProjectRelationExists(
            this.state.entities,
            this.state.projects,
            this.state.declarations
          );
        }
        break;
      case STEP.CERTIFY:
        stepNumber = 3;
        const CERTIFY_PERCENTAGE = 99;
        percent = CERTIFY_PERCENTAGE;
        currentStep = (
          <Certify
            instructionsShowing={this.state.applicationState.instructionsShowing}
            isCertified = {this.state.applicationState.currentDisclosureState.isCertified}
            files={this.state.files}
          />
        );
        heading = 'Certification';
        break;
    }

    let submitDisabled = window.config.general.certificationOptions.required ? !this.state.applicationState.currentDisclosureState.isCertified : false;

    return (
      <div className="flexbox column" style={{height: '100%'}}>
        <AppHeader style={styles.header} />
        <div className="flexbox row fill" style={merge(styles.container, this.props.style)}>
          <Sidebar
            style={styles.sidebar}
            steps={this.steps}
            activestep={stepNumber}
            visitedSteps={this.state.applicationState.currentDisclosureState.visitedSteps}
          />

          <span className="fill" style={styles.content}>
            <DisclosureHeader>{heading}</DisclosureHeader>

            <span style={styles.middle}>
              {currentStep}
            </span>

            <NavSidebar
              percentComplete={percent}
              previousLabel={previousLinkLabel}
              submitDisabled={submitDisabled}
              nextDisabled={nextDisabled}
              showNextLink={showNextLink}
              showPreviousLink={showPreviousLink}
              showSubmitLink={currentDisclosureStep === STEP.CERTIFY}
            />
          </span>
        </div>
      </div>
    );
  }
}
