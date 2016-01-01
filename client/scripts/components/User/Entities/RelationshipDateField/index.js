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
import RelationshipTextField from './RelationshipTextField';
import {DatePicker} from '../../DatePicker';

export default class RelationshipDateField extends RelationshipTextField {
  constructor() {
    super();
  }

  onChange(newDate) {
    this.props.onChange(newDate);
  }

  render() {
    const styles = {
      container: {
        marginBottom: 16,
        textAlign: 'left',
        display: 'block'
      },
      textBox: {
        padding: 6,
        width: '100%',
        borderRadius: 0,
        fontSize: 16,
        border: '1px solid #B0B0B0'
      }
    };

    return (
    <div style={styles.container}>
      <div style={this.getLabelStyle(this.props.invalid)}>{this.props.label}</div>
      <DatePicker
        textFieldStyle={this.getInputStyle(this.props.invalid, styles.textBox)}
        onChange={this.onChange}
        value={this.props.value}
      />
    </div>
    );
  }
}
