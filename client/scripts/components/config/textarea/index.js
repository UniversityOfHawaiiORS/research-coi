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
import ConfigAction from '../../../actions/config-actions';
import classNames from 'classnames';

export default class Textarea extends React.Component {
  constructor() {
    super();

    this.set = this.set.bind(this);
  }

  set(evt) {
    ConfigAction.set({
      dirty: this.props.dirty,
      path: this.props.path,
      value: evt.target.value
    });
  }

  render() {
    let content;
    if (this.props.readOnly) {
      content = (
        <div className={classNames(styles.readOnly)}>
          {this.props.value}
        </div>
      );
    } else {
      content = (
        <textarea
          id={this.props.path}
          name={this.props.path}
          className={this.props.className}
          value={this.props.value}
          onChange={this.set}
        />
      );
    }
    return (
      <div>
        <label htmlFor={this.props.path} className={classNames(styles.textLabel, this.props.labelStyle)}>{this.props.label}</label>
        {content}
      </div>
    );
  }
}
