import React from 'react/addons'; //eslint-disable-line no-unused-vars
import {ResponsiveComponent} from '../../ResponsiveComponent';
import {merge} from '../../../merge';
import {PlusIcon} from '../../DynamicIcons/PlusIcon';

export class NewEntityButton extends ResponsiveComponent {
  constructor() {
    super();
    this.commonStyles = {};
  }

  renderMobile() {}

  renderDesktop() {
    let desktopStyles = {
      container: {
        display: 'inline-block',
        width: 145,
        height: 145,
        backgroundColor: 'white',
        color: 'white',
        padding: '10px',
        fontSize: 23,
        position: 'relative',
        cursor: 'pointer',
        boxShadow: '0 0 15px #e6e6e6',
        borderRadius: 6
      },
      plus: {
        position: 'absolute',
        display: 'block',
        fontSize: 32,
        top: 10,
        right: 12,
        color: 'black'
      },
      newText: {
        color: '#535353',
        fontWeight: 400
      },
      financialText: {
        color: window.config.colors.two,
        fontWeight: 400
      },
      entityText: {
        color: window.config.colors.two,
        fontWeight: 400
      },
      img: {
        height: 42,
        width: 42,
        color: window.config.colors.two
      },
      text: {
        verticalAlign: 'middle',
        marginTop: 43
      }
    };
    let styles = merge(this.commonStyles, desktopStyles);

    return (
      <span onClick={this.props.onClick} style={merge(styles.container, this.props.style)}>
        <div style={styles.text}>
          <div style={styles.newText}>New</div>
          <div style={styles.financialText}>Financial</div>
          <div style={styles.entityText}>Entity</div>
        </div>
        <span style={styles.plus}>
          <PlusIcon style={styles.img} />
        </span>
      </span>
    );
  }
}
