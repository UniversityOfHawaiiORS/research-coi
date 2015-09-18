import React from 'react/addons'; //eslint-disable-line no-unused-vars
import {KButton} from '../KButton';
import {AdminActions} from '../../actions/AdminActions';
import DisclosureFilter from './DisclosureFilter';
import DoneWithFilterButton from './DoneWithFilterButton';

export class DisclosureFilterByStatus extends DisclosureFilter {
  constructor() {
    super();

    this.label = 'STATUS';

    this.toggleFilter = this.toggleFilter.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  clear(e) {
    AdminActions.clearStatusFilter();
    e.stopPropagation();
  }

  toggleFilter(evt) {
    let index = +(evt.target.id.replace('statFilt', ''));
    AdminActions.toggleStatusFilter(this.props.possibleStatuses[index]);
  }

  isChecked(value) {
    return this.props.activeFilters.find(filter => {
      return filter === value;
    }) !== undefined;
  }

  // render() is implemented in DisclosureFilter, which will call renderFilter
  renderFilter() {
    let styles = {
      container: {
        whiteSpace: 'nowrap',
        color: 'black'
      },
      checkbox: {
        textAlign: 'left',
        padding: 10
      },
      clearButton: {
        backgroundColor: '#444',
        color: 'white'
      }
    };

    let options = this.props.possibleStatuses.map((status, index) => {
      let id = 'statFilt' + index;
      return (
        <div style={styles.checkbox} key={status}>
          <input
            id={id}
            type="checkbox"
            checked={this.isChecked(status)}
            onChange={this.toggleFilter}
          />
          <label htmlFor={id}>{status}</label>
        </div>
      );
    });

    return (
      <div style={styles.container}>
        <DoneWithFilterButton onClick={this.close} />
        {options}
        <KButton style={styles.clearButton} onClick={this.clear}>CLEAR FILTER</KButton>
      </div>
    );
  }
}
