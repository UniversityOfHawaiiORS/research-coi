import React from 'react/addons';
import {merge} from '../../../merge';
import {formatDate} from '../../../formatDate';
import {COIConstants} from '../../../../../COIConstants';
import {AdminActions} from '../../../actions/AdminActions';

export default class QuestionSummary extends React.Component {
  constructor() {
    super();

    this.showComments = this.showComments.bind(this);
  }

  showComments() {
    AdminActions.showCommentingPanel(COIConstants.DISCLOSURE_STEP.QUESTIONNAIRE, this.props.question.id, 'QUESTION ' + this.props.question.numberToShow);
  }

  render() {
    let styles = {
      container: {
        marginBottom: 10
      },
      highlighted: {
        borderLeft: window.colorBlindModeOn ? '10px solid black' : '10px solid #F57C00',
        marginLeft: -20,
        paddingLeft: 10
      },
      number: {
        width: 50,
        fontSize: 31,
        color: '#666'
      },
      subQuestionNumber: {
        width: 110,
        fontSize: 31,
        paddingLeft: 50,
        color: '#666'
      },
      answer: {
        fontSize: 13,
        marginLeft: 20,
        fontWeight: 'bold'
      },
      commentLink: {
        display: 'inline-block',
        width: 102,
        fontSize: 14,
        cursor: 'pointer',
        marginTop: 7,
        textAlign: 'right',
        marginRight: 4
      },
      answerSection: {
        display: 'inline-block',
        paddingBottom: 12,
        margin: '7px 5px 15px 0',
        fontSize: 15
      },
      commentLabel: {
        color: window.colorBlindModeOn ? 'black' : '#0095A0',
        borderBottom: window.colorBlindModeOn ? '1px dashed black' : '1px dashed #0095A0',
        paddingBottom: 3
      },
      answerLabel: {
        color: window.colorBlindModeOn ? 'black' : '#00BCD4',
        paddingBottom: 3
      }
    };

    let commentLink;
    if (this.props.question.parent) {
      commentLink = (
        <span style={{width: 125}}>
          <span>
          </span>
        </span>
      );
    }
    else {
      commentLink = (
        <span style={styles.commentLink} onClick={this.showComments}>
          <span style={styles.commentLabel}>
            COMMENT ({this.props.commentCount})
          </span>
        </span>
      );
    }

    let effectiveStyle = merge(styles.container, this.props.style);
    if (this.props.changedByPI) {
      effectiveStyle = merge(effectiveStyle, styles.highlighted);
    }

    return (
      <div style={effectiveStyle} className="flexbox row">
        <span style={this.props.question.parent ? styles.subQuestionNumber : styles.number}>
          <div>{this.props.question.numberToShow}</div>
        </span>
        <span className="fill" style={{display: 'inline-block'}}>
          <div style={{paddingRight: 125, fontSize: 14}}>{this.props.question.text}</div>
          <div className="flexbox row">
            <span className="fill" style={styles.answerSection}>
              <div style={styles.answerLabel}>ANSWER:</div>
              <div style={styles.answer}>
                {this.props.question.type === COIConstants.QUESTION_TYPE.DATE ? formatDate(this.props.answer) : this.props.answer}
              </div>
            </span>
            {commentLink}
          </div>
        </span>
      </div>
    );
  }
}
