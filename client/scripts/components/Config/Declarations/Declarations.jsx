import React from 'react/addons';
import {merge} from '../../../merge';
import Sidebar from '../Sidebar';
import Panel from '../Panel';
import UndoButton from '../UndoButton';
import InstructionEditor from '../InstructionEditor';
import ConfigStore from '../../../stores/ConfigStore';
import DeclarationType from './DeclarationType';
import DeleteLink from '../DeleteLink';
import ConfigActions from '../../../actions/ConfigActions';

export default class Declarations extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.lookForEnter = this.lookForEnter.bind(this);
    this.updateNewValue = this.updateNewValue.bind(this);
  }

  componentDidMount() {
    this.onChange();
    ConfigStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ConfigStore.unlisten(this.onChange);
  }

  onChange() {
    let storeState = ConfigStore.getState();
    this.setState({
      applicationState: storeState.applicationState,
      declarationTypes: storeState.declarationTypes
    });
  }

  lookForEnter(evt) {
    if (evt.keyCode === 13) {
      ConfigActions.saveNewDeclarationType();
    }
  }

  updateNewValue() {
    let textbox = React.findDOMNode(this.refs.newType);
    ConfigActions.setNewDeclarationTypeText(textbox.value);
  }

  render() {
    let styles = {
      container: {
      },
      content: {
        backgroundColor: '#eeeeee',
        boxShadow: '2px 8px 8px #ccc inset'
      },
      stepTitle: {
        boxShadow: '0 2px 8px #D5D5D5',
        fontSize: 33,
        textTransform: 'uppercase',
        padding: '15px 15px 15px 35px',
        color: '#525252',
        fontWeight: 300,
        backgroundColor: 'white'
      },
      configurationArea: {
        padding: 35
      },
      rightPanel: {
        padding: '0 20px'
      },
      types: {
        width: 350
      },
      add: {
        color: '#048EAF',
        margin: '0 0 0 20px',
        padding: 10,
        fontSize: 17,
        cursor: 'pointer'
      },
      textbox: {
        verticalAlign: 'middle',
        marginLeft: 10,
        padding: 3,
        fontSize: 16
      },
      deleteLink: {
        float: 'right',
        paddingTop: 2
      }
    };

    let typesJsx;
    let customTypes;
    if (this.state.declarationTypes) {
      typesJsx = this.state.declarationTypes.filter(type => {
        return !type.custom;
      }).map(type => {
        return (
          <DeclarationType
            type={type}
            key={type.id}
            applicationState={this.state.applicationState}
            toggle={true}
          />
        );
      });

      customTypes = this.state.declarationTypes.filter(type => {
        return type.custom;
      }).map(type => {
        return (
          <DeclarationType
            type={type}
            key={type.id}
            applicationState={this.state.applicationState}
            delete={true}
            toggle={false}
          />
        );
      });
    }

    let newType;
    if (this.state.applicationState && this.state.applicationState.enteringNewType) {
      newType = (
        <div style={{margin: '0 20px 0 10px'}}>
          <input type="text" ref="newType" value={this.state.applicationState.newTypeText} style={styles.textbox} onKeyUp={this.lookForEnter} onChange={this.updateNewValue} />
          <DeleteLink style={styles.deleteLink} onClick={ConfigActions.deleteInProgressCustomDeclarationType} />
        </div>
      );

      requestAnimationFrame(() => {
        React.findDOMNode(this.refs.newType).focus();
      });
    }

    return (
      <span className="fill flexbox row" style={merge(styles.container, this.props.style)}>
        <Sidebar active="declarations" />
        <span style={styles.content} className="inline-flexbox column fill">
          <div style={styles.stepTitle}>
            Customize Project Declarations
          </div>
          <div className="fill flexbox row" style={styles.configurationArea}>
            <span className="fill">
              <InstructionEditor step="Project Declaration" />
              <Panel title="Declaration Types">
                <div style={styles.types}>
                  {typesJsx}

                  {customTypes}
                  {newType}
                  <div style={styles.add} onClick={ConfigActions.startEnteringNewDeclarationType}>+ Add Another</div>
                </div>

                <div style={{paddingBottom: 10}}>
                </div>
              </Panel>
            </span>
            <span style={styles.rightPanel}>
              <UndoButton onClick={this.undo} />
            </span>
          </div>
        </span>
      </span>
    );
  }
}