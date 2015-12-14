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

export default class ToggleButton extends React.Component {
  constructor() {
    super();

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    this.props.onClick(this.props.value);
  }

  render() {
    const styles = {
      button: {
        backgroundColor: 'white',
        border: '1px solid #bbb',
        padding: '8px 20px',
        fontSize: 12,
        position: 'relative'
      },
      selected: {
        backgroundColor: window.colorBlindModeOn ? 'black' : '#0095A0',
        fontWeight: 'bold',
        color: 'white',
        zIndex: 2
      },
      unselected: {
        boxShadow: '0 0 15px #cecece'
      },
      arrow: {
        position: 'absolute',
        width: 0,
        height: 0,
        border: '7px solid transparent',
        borderTopColor: window.colorBlindModeOn ? 'black' : '#0095A0',
        top: 29,
        right: '44%'
      }
    };

    let arrow;
    if (this.props.isSelected) {
      arrow = (
        <div style={styles.arrow}></div>
      );
    }

    return (
      <button
        style={
          merge(
            styles.button,
            this.props.style,
            this.props.isSelected ? styles.selected : styles.unselected
          )
        }
        onClick={this.clicked}
        value={this.props.value.code}>
        {this.props.value.description}
        {arrow}
      </button>
    );
  }
}
