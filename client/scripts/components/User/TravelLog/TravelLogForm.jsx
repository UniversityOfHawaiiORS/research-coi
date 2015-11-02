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

import React from 'react/addons';
import {ProminentButton} from '../../ProminentButton';
import {TravelLogActions} from '../../../actions/TravelLogActions';
import {DatePicker} from '../../DatePicker';
import TextField from '../TextField';
import CurrencyField from '../CurrencyField';

export class TravelLogForm extends React.Component {
    constructor() {
      super();

      this.addEntry = this.addEntry.bind(this);
      this.updateStartDate = this.updateStartDate.bind(this);
      this.updateEndDate = this.updateEndDate.bind(this);
    }

    addEntry() {
      TravelLogActions.addEntry();
    }

    updateField(evt) {
      TravelLogActions.updateTravelLog(evt.target.id, evt.target.value);
    }

    updateStartDate(newValue) {
      TravelLogActions.updateTravelLog('startDate', newValue);
    }

    updateEndDate(newValue) {
      TravelLogActions.updateTravelLog('endDate', newValue);
    }

    render() {
      let styles = {
        container: {
          margin: '44px 50px'
        },
        textField: {
          container: {
            display: 'inline-block',
            marginRight: 20,
            width: '27%'
          },
          input: {
            padding: '2px 8px',
            fontSize: 16,
            borderRadius: 5,
            border: '1px solid #ccc',
            height: 30,
            width: '90%'
          },
          label: {
            marginBottom: 5,
            fontWeight: '500'
          }
        },
        date: {
          width: '40%',
          display: 'inline-block'
        },
        dateMiddle: {width: '20%',
          display: 'inline-block',
          textAlign: 'center'
        }
      };

      return (
        <div style={styles.container}>
          <TextField
            id='entityName'
            label='ENTITY NAME'
            onChange={this.updateField}
            name="Entity Name"
            styles={styles.textField}
            value={this.props.entry.entityName}
          />
          <CurrencyField
            id='amount'
            label='AMOUNT'
            onChange={this.updateField}
            name="Amount"
            styles={styles.textField}
            value={this.props.entry.amount}
          />
          <TextField
            id='destination'
            label='DESTINATION'
            onChange={this.updateField}
            name="Destinantion"
            styles={styles.textField}
            value={this.props.entry.destination}
          />
          <div style={styles.textField.container}>
            <label htmlFor='dateRange' style={styles.textField.label}>DATE RANGE</label>
            <div id='dateRange' style={{width: '90%'}}>
              <DatePicker id="startDate" onChange={this.updateStartDate} value={this.props.entry.startDate} style={styles.date} textFieldStyle={styles.textField.input}/>
              <div style={styles.dateMiddle}>TO</div>
              <DatePicker id="endDate" onChange={this.updateEndDate} value={this.props.entry.endDate} style={styles.date} textFieldStyle={styles.textField.input}/>
            </div>
          </div>
          <TextField
            id='reason'
            label='REASON'
            onChange={this.updateField}
            name="Reason"
            styles={styles.textField}
            value={this.props.entry.reason}
          />
          <div style={styles.textField.container}>
            <ProminentButton onClick={this.addEntry}>+ ADD</ProminentButton>
          </div>
          </div>
      );
    }
}
