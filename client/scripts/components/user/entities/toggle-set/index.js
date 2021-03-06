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
import {Toggle} from '../toggle';

export class ToggleSet extends React.Component {
  constructor(props) {
    super();

    this.state = {
      value: props.selected
    };

    this.change = this.change.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selected !== this.props.selected) {
      this.setState({
        value: newProps.selected
      });
    }
  }

  change(newValue) {
    this.setState({value: newValue});
    this.props.onChoose(newValue);
  }

  render() {
    const toggles = this.props.values.map(value => {
      return (
        <Toggle
          className={`${styles.override} ${styles.toggle}`}
          typeCd={value.typeCd}
          text={value.description}
          selected={this.state.value === value.typeCd}
          onClick={this.change}
          key={value.typeCd}
        />
      );
    });

    return (
      <div className={`${styles.container} ${this.props.className}`}>
        {toggles}
      </div>
    );
  }
}
