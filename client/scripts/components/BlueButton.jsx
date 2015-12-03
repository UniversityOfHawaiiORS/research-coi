/* @flow */
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

import React from 'react'; // eslint-disable-line no-unused-vars
import {merge} from '../merge';

export function BlueButton (props: Object): React.Element {
  let styles = {
    container: {
      color: 'white',
      textShadow: '1px 1px 6px #777',
      backgroundColor: window.colorBlindModeOn ? '#333' : '#0095A0',
      border: 0,
      borderBottom: window.colorBlindModeOn ? '2px solid black' : '2px solid #00464B',
      borderRadius: 3,
      fontSize: 12,
      padding: '4px 13px',
      cursor: 'pointer',
      minWidth: 100
    }
  };

  return (
    <button
      {...props}
      style={merge(styles.container, props.style)}
    >
      {props.children}
    </button>
  );
}
