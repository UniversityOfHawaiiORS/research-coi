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
import {PlusIcon} from '../../../DynamicIcons/PlusIcon';

export function NewEntityButton(props) {
  return (
    <span onClick={props.onClick} className={`${styles.container} ${props.className}`}>
      <div className={styles.text}>
        <div className={styles.newText}>New</div>
        <div className={styles.financialText}>Financial</div>
        <div className={styles.entityText}>Entity</div>
      </div>
      <span className={styles.plus}>
        <PlusIcon
          className={`${styles.override} ${styles.img}`}
          color={window.colorBlindModeOn ? 'black' : '#00bcd4'}
        />
      </span>
    </span>
  );
}
