import React, { Component } from 'react';

class ObjectBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [{ num: 0 }] };
  }

  rowsToObj() {
    const rowObjs = this.state.rows.filter(r => r.included).map(r => ({ [r.field]: r.value }));
    return Object.assign({}, ...rowObjs);
  }

  checkboxClick(index) {
    const newRows = this.state.rows.slice(); // a copy
    newRows[index].included = !newRows[index].included;
    this.setState({ rows: newRows });
  }

  makeOnTextChange(index, property) {
    return (event) => {
      const newRows = this.state.rows.slice(); // a copy
      newRows[index][property] = event.target.value;
      this.setState({ rows: newRows });
    };
  }

  addRow() {
    this.setState({ rows: this.state.rows.concat({ num: this.state.rows.length }) });
  }


  render() {
    const { doWithObj, buttonMsg } = this.props;
    return (
      <div>
        {this.state.rows.map((x, i) => (
          <div key={x.num}>
            <input
              type="checkbox"
              onClick={() => this.checkboxClick(i)}
              style={{ width: 100, marginRight: 15 }}
            />
            <input
              type="text"
              onChange={this.makeOnTextChange(i, 'field')}
              placeholder="field"
              style={{ width: 100, marginRight: 50 }}
            />
            <input
              type="text"
              onChange={this.makeOnTextChange(i, 'value')}
              placeholder="value"
              style={{ width: 300 }}
            />
          </div>
      ))}
        <button onClick={() => this.addRow()}>Add field</button>
        <button onClick={() => { doWithObj(this.rowsToObj()); }}>{buttonMsg}</button>
      </div>
    );
  }
}

export default ObjectBuilder;
