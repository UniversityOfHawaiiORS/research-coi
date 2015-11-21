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

import React from 'react'; //eslint-disable-line no-unused-vars
import {ResponsiveComponent} from '../ResponsiveComponent';
import {merge} from '../../merge';
import {DisclosureActions} from '../../actions/DisclosureActions';
import {GreyButton} from '../GreyButton';
import VerticalSlider from '../VerticalSlider';

export class Instructions extends ResponsiveComponent {
  close() {
    DisclosureActions.toggleInstructions();
  }

  renderDesktop() {
    let styles = {
      container: {
        color: 'white',
        whiteSpace: 'normal',
        backgroundColor: window.colorBlindModeOn ? 'black' : '#0095A0',
        padding: '47px 25px 31px 53px'
      },
      buttons: {
        textAlign: 'right',
        padding: '14px 14px 0 0'
      },
      closeButton: {
        padding: '3px 16px',
        fontSize: 15,
        marginRight: 23
      },
      arrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        border: '25px solid transparent',
        borderTopColor: 'white',
        top: 0,
        right: 25,
        zIndex: 11
      }
    };

    return (
      <VerticalSlider collapsed={this.props.collapsed}>
        <div ref="instructionsBox" style={merge(styles.container, this.props.style)}>
          <div style={styles.arrow}></div>
          <div>{this.props.text}</div>
          <div style={styles.buttons}>
            <GreyButton style={styles.closeButton} onClick={this.close}>CLOSE</GreyButton>
          </div>
        </div>
      </VerticalSlider>
    );
  }
}
