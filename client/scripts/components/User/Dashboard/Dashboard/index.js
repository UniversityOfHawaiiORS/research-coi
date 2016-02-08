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
import classNames from 'classnames';
import React from 'react';
import {AppHeader} from '../../../AppHeader';
import {NewDisclosureButton} from '../NewDisclosureButton';
import {DisclosureArchiveButton} from '../DisclosureArchiveButton';
import {ConfirmationMessage} from '../ConfirmationMessage';
import {DisclosureTable} from '../DisclosureTable';
import {DisclosureStore} from '../../../../stores/DisclosureStore';
import {TravelLogButton} from '../TravelLogButton';
import {DisclosureActions} from '../../../../actions/DisclosureActions';
import {COIConstants} from '../../../../../../COIConstants';
import ConfigStore from '../../../../stores/ConfigStore';
import UserInfoStore from '../../../../stores/UserInfoStore';
import AdminMenu from '../../../AdminMenu';

export class Dashboard extends React.Component {
  constructor() {
    super();

    const storeState = DisclosureStore.getState();
    const configState = ConfigStore.getState();

    this.state = {
      applicationState: storeState.applicationState,
      disclosureSummaries: storeState.disclosureSummariesForUser,
      configLoaded: configState.isLoaded,
      userInfo: UserInfoStore.getState().userInfo
    };

    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate() { return true; }

  componentDidMount() {
    DisclosureStore.listen(this.onChange);
    ConfigStore.listen(this.onChange);
    DisclosureActions.loadDisclosureSummaries();
  }

  componentWillUnmount() {
    DisclosureStore.unlisten(this.onChange);
    ConfigStore.unlisten(this.onChange);
  }

  onChange() {
    const storeState = DisclosureStore.getState();
    const configState = ConfigStore.getState();
    this.setState({
      applicationState: storeState.applicationState,
      disclosureSummaries: storeState.disclosureSummariesForUser,
      configLoaded: configState.isLoaded,
      userInfo: UserInfoStore.getState().userInfo
    });
  }

  render() {
    const isAdmin = this.state.userInfo && this.state.userInfo.coiRole === COIConstants.ROLES.ADMIN;

    let confirmationMessage;
    if (this.state && this.state.applicationState && this.state.applicationState.confirmationShowing) {
      confirmationMessage = (
        <ConfirmationMessage />
      );
    }

    let annualDisclosureButton;
    let travelLogButton;
    let manualDisclosureButton;

    let annualDisclosureEnabled;
    let manualDisclosureEnabled;
    let travelLogEnabled;

    window.config.disclosureTypes.forEach(type => {
      switch(type.typeCd.toString()) { // eslint-disable-line default-case
        case COIConstants.DISCLOSURE_TYPE.ANNUAL:
          annualDisclosureEnabled = type.enabled === 1;
          break;
        case COIConstants.DISCLOSURE_TYPE.MANUAL:
          manualDisclosureEnabled = type.enabled === 1;
          break;
        case COIConstants.DISCLOSURE_TYPE.TRAVEL:
          travelLogEnabled = type.enabled === 1;
          break;
      }
    });

    if (annualDisclosureEnabled) {
      const annualDisclosure = this.state.disclosureSummaries.find(summary => {
        return summary.type.toString() === COIConstants.DISCLOSURE_TYPE.ANNUAL;
      });
      if (!annualDisclosure || annualDisclosure.status === COIConstants.DISCLOSURE_STATUS.IN_PROGRESS ||
          annualDisclosure.status === COIConstants.DISCLOSURE_STATUS.UP_TO_DATE) {
        annualDisclosureButton = (
          <div>
            <NewDisclosureButton type={COIConstants.DISCLOSURE_TYPE.ANNUAL}/>
          </div>
        );
      }
    }

    if (travelLogEnabled) {
      travelLogButton = (
        <div>
          <TravelLogButton/>
        </div>
      );
    }

    if (manualDisclosureEnabled) {
      manualDisclosureButton = (
        <div>
          <NewDisclosureButton type={COIConstants.DISCLOSURE_TYPE.MANUAL} />
        </div>
      );
    }
    if (!this.state.configLoaded) {
      return (<div/>);
    }

    let adminMenu;
    if (isAdmin) {
      adminMenu = (
        <AdminMenu className={`${styles.override} ${styles.adminMenu}`} />
      );
    }

    const classes = classNames(
      'flexbox',
      'column',
      {[styles.isAdmin]: isAdmin}
    );

    return (
      <div className={classes} style={{height: '100%'}}>
        <AppHeader className={`${styles.override} ${styles.header}`} moduleName={'Conflict Of Interest'} />
        <span className={`flexbox row fill ${styles.container} ${this.props.className}`}>
          <span className={styles.sidebar}>
            {adminMenu}
            {annualDisclosureButton}
            {travelLogButton}
            {manualDisclosureButton}
            <div>
              <DisclosureArchiveButton className={`${styles.override} ${styles.borderBottom}`} />
            </div>
          </span>
          <span className={`fill ${styles.content}`}>
            <div className={styles.header2}>
              <h2 className={styles.heading}>MY COI DASHBOARD</h2>
            </div>
            {confirmationMessage}

            <DisclosureTable disclosures={this.state.disclosureSummaries} />
          </span>
        </span>
      </div>
    );
  }
}
