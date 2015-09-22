import React from 'react/addons'; //eslint-disable-line no-unused-vars
import {ResponsiveComponent} from '../ResponsiveComponent';
import {merge} from '../../merge';
import {ProgressIndicator} from './ProgressIndicator';
import {DeleteIcon} from '../DynamicIcons/DeleteIcon';
import {NextIcon} from '../DynamicIcons/NextIcon';
import {PreviousIcon} from '../DynamicIcons/PreviousIcon';
import {COIConstants} from '../../../../COIConstants';
import {DisclosureActions} from '../../actions/DisclosureActions';

export class NavSidebar extends ResponsiveComponent {
  constructor() {
    super();
    this.commonStyles = {};

    this.closeDisclosure = this.closeDisclosure.bind(this);
    this.submitDisclosure = this.submitDisclosure.bind(this);
  }

  closeDisclosure() {
    DisclosureActions.resetDisclosure();
    window.location = '#/dashboard';
  }

  submitDisclosure() {
    if (!this.props.submitDisabled) {
      this.closeDisclosure();
      DisclosureActions.toggleConfirmationMessage();
    }
  }

  goBack() {
    DisclosureActions.previousQuestion();
  }

  nextStep() {
    DisclosureActions.nextStep();
  }

  renderMobile() {}

  renderDesktop() {
    let desktopStyles = {
      container: {
        verticalAlign: 'top',
        width: '25%',
        display: 'inline-block',
        paddingTop: 55,
        textAlign: 'center'
      },
      prevquestion: {
        margin: '14px 0 14px 0',
        fontSize: 15,
        cursor: 'pointer',
        color: '#1481A3',
        display: this.props.question <= 1 && this.props.step === COIConstants.DISCLOSURE_STEP.QUESTIONNAIRE ? 'none' : 'block'
      },
      icon: {
        color: '#1481A3',
        marginRight: 3,
        width: 33,
        height: 33,
        verticalAlign: 'middle'
      },
      nextquestion: {
        margin: '14px 0 14px 0',
        fontSize: 15,
        cursor: 'pointer',
        color: '#1481A3'
      },
      navigation: {
        verticalAlign: 'top',
        width: '25%',
        display: 'inline-block',
        paddingTop: 55,
        textAlign: 'center'
      },
      stepLabel: {
        verticalAlign: 'middle'
      },
      stepButtons: {
        textAlign: 'left',
        display: 'inline-block'
      },
      disabled: {
        color: '#AAA',
        cursor: 'default'
      }
    };
    let styles = merge(this.commonStyles, desktopStyles);

    let nextStep;
    if (
      this.props.step !== COIConstants.DISCLOSURE_STEP.QUESTIONNAIRE &&
      this.props.step !== COIConstants.DISCLOSURE_STEP.CERTIFY &&
      !this.props.nextDisabled
    ) {
      nextStep = (
        <div onClick={this.nextStep} style={styles.nextquestion}>
          <NextIcon style={styles.icon} />
          <span style={styles.stepLabel}>
            NEXT STEP
          </span>
        </div>
      );
    }

    let cancel;
    let submit;
    if (this.props.step === COIConstants.DISCLOSURE_STEP.CERTIFY) {
      cancel = (
        <div onClick={this.closeDisclosure} style={styles.nextquestion}>
          <DeleteIcon style={styles.icon} />
          <span style={styles.stepLabel}>
            CANCEL
          </span>
        </div>
      );

      let submitStyle;
      if (this.props.submitDisabled) {
        submitStyle = merge(styles.nextquestion, styles.disabled);
      } else {
        submitStyle = styles.nextquestion;
      }
      submit = (
        <div onClick={this.submitDisclosure} style={submitStyle}>
          <NextIcon style={styles.icon} />
          <span style={styles.stepLabel}>
            SUBMIT
          </span>
        </div>
      );
    }

    let previousLabel;
    if (this.props.step === COIConstants.DISCLOSURE_STEP.QUESTIONNAIRE) {
      previousLabel = 'PREVIOUS QUESTION';
    } else if (this.props.step === COIConstants.DISCLOSURE_STEP.CERTIFY) {
      previousLabel = 'BACK';
    } else {
      previousLabel = 'PREVIOUS STEP';
    }

    return (
      <span style={styles.navigation}>
        <div onClick={this.advance}>
          <ProgressIndicator percent={this.props.percent}/>
        </div>

        <div style={styles.stepButtons}>
          <div onClick={this.goBack} style={styles.prevquestion}>
            <PreviousIcon style={styles.icon} />
            <span style={styles.stepLabel}>
              {previousLabel}
            </span>
          </div>

          {submit}
          {nextStep}
          {cancel}
        </div>
      </span>
    );
  }
}
