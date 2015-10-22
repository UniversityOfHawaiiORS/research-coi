import React from 'react/addons'; //eslint-disable-line no-unused-vars
import {merge} from '../../../merge';
import {DisclosureTableRow} from './DisclosureTableRow';

export class DisclosureTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    let styles = {
      container: {
        borderRadius: 5,
        boxShadow: '0 0 10px #C0C0C0',
        margin: '44px 50px'
      },
      heading: {
        fontWeight: window.colorBlindModeOn ? 'normal' : 300,
        width: '25%',
        display: 'inline-block',
        padding: '20px 0',
        fontSize: 17
      },
      headings: {
        borderBottom: '1px solid #BBB',
        padding: '0 60px',
        backgroundColor: 'white',
        borderRadius: '5px 5px 0 0'
      },
      columnOne: {
        width: '35%'
      },
      columnTwo: {
        width: '25%'
      },
      columnThree: {
        width: '25%'
      }
    };

    let rows = this.props.disclosures ? this.props.disclosures.map((disclosure, index) => {
      return (
        <DisclosureTableRow
          type={disclosure.type}
          status={disclosure.status}
          lastreviewed={disclosure.last_review_date}
          title={disclosure.title}
          expiresOn={disclosure.expired_date}
          key={index}
          disclosureId={disclosure.id}
        />
      );
    }) : null;

    return (
      <div role="grid" style={merge(styles.container, this.props.style)}>
        <div role="row" style={styles.headings}>
          <span role="columnheader" style={merge(styles.heading, styles.columnOne)}>DISCLOSURE TYPE</span>
          <span role="columnheader" style={merge(styles.heading, styles.columnTwo)}>STATUS</span>
          <span role="columnheader" style={merge(styles.heading, styles.columnThree)}>LAST REVIEWED</span>
        </div>
        {rows}
      </div>
    );
  }
}
