import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({ seenIndexes: seenIndexes.data });
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  renderValues() {
    return Object.entries(this.state.values).map(([key, value]) => {
      return (
        <div key={key}>
          For index {key} I calculated {value}
        </div>
      );
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", { index: this.state.index });
    this.setState({ index: "" });
    this.fetchIndexes();
    this.fetchValues();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input type="text" value={this.state.index} onChange={(e) => this.setState({ index: e.target.value })} />
          <button type="submit">Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
