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

import React from 'react/addons'; //eslint-disable-line no-unused-vars
import {ResponsiveComponent} from '../../ResponsiveComponent';
import {merge} from '../../../merge';
import Router from 'react-router';
let Link = Router.Link;
import {PlusIcon} from '../../DynamicIcons/PlusIcon';
import ConfigStore from '../../../stores/ConfigStore';
import {COIConstants} from '../../../../../COIConstants';

export class NewDisclosureButton extends ResponsiveComponent {
  constructor() {
    super();
    this.commonStyles = {
    };
  }

  renderMobile() {
    let mobileStyles = {
      container: {
        display: 'inline-block',
        backgroundColor: '#eeeeee',
        verticalAlign: 'top',
        padding: 5,
        cursor: 'pointer',
        color: 'white',
        fontWeight: '300',
        borderRight: '1px solid white',
        fontSize: 11,
        textTransform: 'uppercase',
        textAlign: 'center',
        width: '20%'
      },
      icon: {
        color: 'white',
        width: 45,
        height: 45
      }
    };
    let styles = merge(this.commonStyles, mobileStyles);

    return (
      <Link to="disclosure" query={{type: this.props.type}} style={merge(styles.container, this.props.style)}>
        <div>
          <PlusIcon style={styles.icon} />
          <div>
            {this.props.type}
          </div>
          <div>
            Disclosure
          </div>
        </div>
      </Link>
    );
  }

  renderDesktop() {
    let desktopStyles = {
      container: {
        display: 'block',
        backgroundColor: '#eeeeee',
        verticalAlign: 'top',
        padding: '20px 30px 20px 30px',
        cursor: 'pointer',
        color: window.colorBlindModeOn ? 'black' : '#666',
        fontWeight: '300',
        borderTop: '1px solid #c0c0c0'
      },
      primary: {
        fontSize: 28,
        fontWeight: 300
      },
      secondary: {
        fontSize: 22,
        fontWeight: 'bold'
      }
    };
    let styles = merge(this.commonStyles, desktopStyles);

    return (
      <Link to="disclosure" query={{type: this.props.type}} style={merge(styles.container, this.props.style)}>
        <div>
          <span>
            <div style={styles.primary}>{this.props.type === COIConstants.DISCLOSURE_TYPE.ANNUAL ? 'Update' : 'New'}</div>
            <div style={styles.secondary}>{ConfigStore.getDisclosureTypeString(this.props.type)}</div>
          </span>
        </div>
      </Link>
    );
  }
}
