import React from 'react/addons';

export class PlusIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg style={this.props.style} version="1.1" id="Layer_1" x="0px" y="0px" width="100px" height="100px" viewBox="5.0 -10.0 100.0 135.0" enable-background="new 0 0 100 100">
        <line fill={this.props.style.color} stroke={this.props.style.color} strokeWidth="4" strokeLinecap="round" stroke-miterlimit="10" x1="50" y1="5" x2="50" y2="95"/>
        <line fill={this.props.style.color} stroke={this.props.style.color} strokeWidth="4" strokeLinecap="round" stroke-miterlimit="10" x1="95" y1="50" x2="5" y2="50"/>
      </svg>
    );
  }
}

PlusIcon.defaultProps = {
  style: {
    color: 'white'
  }
};