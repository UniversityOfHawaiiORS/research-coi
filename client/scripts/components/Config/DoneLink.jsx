import React from 'react/addons';
import {merge} from '../../merge';
import CheckmarkIcon from '../DynamicIcons/CheckmarkIcon';

export default class DoneLink extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    let styles = {
      container: {
        borderBottom: '1px dotted #D46400',
        cursor: 'pointer'
      },
      linkText: {
        paddingLeft: 2,
        color: '#D46400',
        verticalAlign: 'middle',
        fontSize: 8
      },
      icon: {
        width: 15,
        height: 15,
        color: '#D46400',
        verticalAlign: 'middle'
      }
    };

    return (
      <span onClick={this.props.onClick} style={merge(styles.container, this.props.style)}>
        <CheckmarkIcon style={styles.icon} />
        <span style={styles.linkText}>Done</span>
      </span>
    );
  }
}