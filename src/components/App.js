import React, { Component } from 'react';
import '../css/index.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      gridComponents: []
    };
  }

  renderExampleCells() {
      var divs = [];

      for(var i=0; i<10000; i++)
           divs.push(<div id={i} key={i} onClick={(e) => this.addTestComponent(e)}/>);

      return divs;
  }

  addTestComponent(e) {
    var id = e.currentTarget.id;
    var row = Math.floor(id / 10) + 1;
    var column = id % 10 + 1;

    var height = parseInt(prompt("Enter column span"));
    var width = parseInt(prompt("Enter row span"));
    var color = prompt("Enter the color of the component");

    var newComponents = this.state.gridComponents;
    newComponents.push(
        <div style={{
                 gridArea: row+" / "+column+" / span "+width+" / span "+height,
                 backgroundColor: color
             }}
        >
        </div>
    );

    this.setState({
        gridComponents: newComponents
    });
  }

  render() {
    return [
      <div className="app"
           onScroll={(e) => {
               document.getElementsByClassName("overlay-grid")[0].scrollTop = e.currentTarget.scrollTop;
           }}
      >
          {this.renderExampleCells()}
      </div>,
      <div className="overlay-grid">
          {this.state.gridComponents}
      </div>
    ];
  }

}

export default App;
