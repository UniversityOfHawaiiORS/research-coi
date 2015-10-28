import React from 'react/addons'; //eslint-disable-line no-unused-vars
import {merge} from '../../../merge';
import {KButton} from '../../KButton';
import {EntityForm} from './EntityForm';
import {DisclosureActions} from '../../../actions/DisclosureActions';
import ConfigStore from '../../../stores/ConfigStore';

export class Entity extends React.Component {
  constructor() {
    super();

    this.toggleStatus = this.toggleStatus.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  shouldComponentUpdate() { return true; }

  showForm() {
    DisclosureActions.updateEntityFormOpened(this.props.id);
  }

  toggleStatus() {
    let active = this.props.entity.active === 1 ? 0 : 1;
    DisclosureActions.setEntityActiveStatus(active, this.props.id);
  }

  render() {
    let styles = {
      container: {
        display: 'block',
        marginBottom: 25,
        backgroundColor: 'white',
        boxShadow: '0 0 15px #e6e6e6',
        borderRadius: 5,
        overflowY: 'hidden'
      },
      content: {
        position: 'relative',
        zIndex: 10,
        padding: '13px 16px',
        boxShadow: '0 0 15px #E6E6E6',
        fontSize: 17,
        backgroundColor: 'white'
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      dataitem: {
        margin: '10px 0',
        fontSize: 20,
        display: 'inline-block'
      },
      button: {
        margin: '7px 10px 7px 0'
      },
      relationships: {
        fontWeight: 'bold',
        marginLeft: 7,
        display: 'inline-block',
        verticalAlign: 'top'
      },
      entityForm: {
        display: this.props.step >= 0 ? 'block' : 'none',
        transition: 'margin-top .3s ease-in-out'
      },
      buttonCell: {
        width: 268
      },
      relationshipLabel: {
        display: 'inline-block',
        verticalAlign: 'top'
      }
    };

    let statusButton;
    if (this.props.entity.active === 1) {
      statusButton = (<KButton onClick={this.toggleStatus} style={styles.button}>Deactivate</KButton>);
    } else {
      statusButton = (<KButton onClick={this.toggleStatus} style={styles.button}>Reactivate</KButton>);
    }

    let relationships = this.props.entity.relationships.map((relationship) => {
      return (
        <div key={relationship.id}>
          {ConfigStore.getRelationshipPersonTypeString(relationship.personCd)} - {ConfigStore.getRelationshipCategoryTypeString(relationship.relationshipCd)}
        </div>
      );
    });

    return (
      <div style={merge(styles.container, this.props.style)}>
        <div style={styles.content}>
          <div style={styles.name}>{this.props.entity.name}</div>
          <div style={{margin: '10px 0 0 20px'}} className="flexbox row">
            <span className="fill" style={styles.dataitem}>
              <span style={styles.relationshipLabel}>Relationship:</span>
              <span style={styles.relationships}>
                {relationships}
              </span>
            </span>
            <span style={styles.buttonCell}>
              <KButton style={styles.button} onClick={this.showForm}>View Summary</KButton>
              {statusButton}
            </span>
          </div>
        </div>

        <EntityForm
          update="true"
          step={this.props.step}
          style={styles.entityForm}
          entity={this.props.entity}
          editing={this.props.editing}
          snapshot={this.props.snapshot}
          appState={this.props.appState}
        />
      </div>
    );
  }
}
