/*
    The Conflict of Interest (COI) module of Kuali Research
    Copyright © 2005-2016 Kuali, Inc.

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

import styles from './style';
import React from 'react';
import RelationshipTextField from '../relationship-text-field';
import {DatePicker} from '../../../date-picker';

export default class RelationshipDateField extends RelationshipTextField {
  constructor() {
    super();
  }

  onChange(newDate) {
    this.props.onChange(newDate);
  }

  render() {
    return (
      <div className={styles.container}>
        <div style={this.getLabelStyle(this.props.invalid)}>{this.props.label}</div>
        <DatePicker
          textFieldStyle={this.getInputStyle(this.props.invalid, {
            padding: 6,
            width: '100%',
            borderRadius: 0,
            fontSize: 16,
            border: '1px solid #B0B0B0'
          })}
          onChange={this.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}
