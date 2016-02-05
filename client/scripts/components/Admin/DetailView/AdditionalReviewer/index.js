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
import { AdminActions } from '../../../../actions/AdminActions';

export default class AdditionalReviewer extends React.Component {
  constructor() {
    super();

    this.removeAdditionalReviewer = this.removeAdditionalReviewer.bind(this);
  }

  removeAdditionalReviewer() {
    AdminActions.removeAdditionalReviewer(this.props.id);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.name}>
            {this.props.name}
          </div>
          <div className={styles.email}>
            {this.props.email}
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={this.removeAdditionalReviewer}
          >
            <i className={`fa fa-times`} style={{marginRight:'5px'}}></i>
            Remove Reviewer
          </button>
        </div>
      </div>
    );
  }
}