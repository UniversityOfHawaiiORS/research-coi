import React from 'react/addons';
import {merge} from '../../../merge';
import Sidebar from '../Sidebar';
import ActionPanel from '../ActionPanel';
import InstructionEditor from '../InstructionEditor';
import ConfigStore from '../../../stores/ConfigStore';
import QuestionnaireConfig from '../QuestionnaireConfig';
import {COIConstants} from '../../../../../COIConstants';

export default class Questionnaire extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.onChange();
    ConfigStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ConfigStore.unlisten(this.onChange);
  }

  onChange() {
    let storeState = ConfigStore.getState();
    this.setState({
      applicationState: storeState.applicationState,
      questions: storeState.config.questions.entities,
      instructions: storeState.config.general.instructions,
      dirty: storeState.dirty
    });
  }

  render() {
    let styles = {
      container: {
        overflowY: 'auto',
        minHeight: 0
      },
      content: {
        backgroundColor: '#eeeeee',
        boxShadow: '2px 8px 8px #ccc inset',
        minHeight: 0
      },
      stepTitle: {
        boxShadow: '0 2px 8px #D5D5D5',
        fontSize: 33,
        textTransform: 'uppercase',
        padding: '15px 15px 15px 35px',
        color: '#525252',
        fontWeight: 300,
        backgroundColor: 'white',
        minHeight: 68
      },
      configurationArea: {
        padding: 35,
        overflowY: 'auto',
        minHeight: 0
      }
    };

    let instructionText = '';
    if (this.state.instructions && this.state.instructions[COIConstants.INSTRUCTION_STEP.FINANCIAL_ENTITIES]) {
      instructionText = this.state.instructions[COIConstants.INSTRUCTION_STEP.FINANCIAL_ENTITIES];
    }

    let configSection;
    if (this.state.applicationState) {
      configSection = (
        <span className="fill">
          <InstructionEditor
            step={COIConstants.INSTRUCTION_STEP.FINANCIAL_ENTITIES}
            value={instructionText}
          />
          <QuestionnaireConfig
            questionnaireCategory="entities"
            questions={this.state.questions}
            questionsBeingEdited={this.state.applicationState.questionsBeingEdited.entities}
            newQuestion={this.state.applicationState.newQuestion.entities}
            disableSubQuestions={true}
          />
        </span>
      );
    }

    return (
      <span className="fill flexbox row" style={merge(styles.container, this.props.style)}>
        <Sidebar active="entities" />
        <span style={styles.content} className="inline-flexbox column fill">
          <div style={styles.stepTitle}>
            Financial Entities Questionnaire
          </div>
          <div className="fill flexbox row" style={styles.configurationArea}>
            {configSection}
            <ActionPanel visible={this.state.dirty} />
          </div>
        </span>
      </span>
    );
  }
}
