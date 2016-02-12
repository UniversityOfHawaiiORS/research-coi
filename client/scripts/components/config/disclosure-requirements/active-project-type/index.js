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

import styles from './style';
import React from 'react';

export default class ActiveProjectType extends React.Component {
  constructor() {
    super();

    this.configure = this.configure.bind(this);
  }

  configure() {
    this.props.configure(this.props.typeCd);
  }

  render() {
    return (
      <div className={styles.container}>
        <i className={`fa fa-check-circle-o ${styles.icon}`}></i>
        <div className={styles.content}>
          <div className={styles.description}>
            {this.props.description}
          </div>
          <button className={styles.link} onClick={this.configure}>Configure Roles & Statuses</button>
        </div>
      </div>
    );
  }
}