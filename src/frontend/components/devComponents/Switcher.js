import React, { Component } from 'react';

class Switcher extends Component {
  constructor(props) {
    super(props);
    this.state = { component: 0 };
  }

  render() {
    return (
      <div>
        <select defaultValue="0" onChange={x => this.setState({ component: x.target.value })}>
          {this.props.children.map((x, i) => (
            <option value={i} key={this.props.names[i]}>{this.props.names[i]}</option>
          ))}
        </select>
        {this.props.children[this.state.component]}
      </div>
    );
  }
}


export default Switcher;
