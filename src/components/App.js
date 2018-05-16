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
           divs.push(
               <div id={i}
                    key={i}
                    onClick={(e) => this.addTestComponent(e)}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        var index = parseInt(e.dataTransfer.getData("index"));
                        var height = parseInt(e.dataTransfer.getData("height"));
                        var width = parseInt(e.dataTransfer.getData("width"));

                        var id = e.currentTarget.id;
                        var row = Math.floor(id / 10) + 1;
                        var column = id % 10 + 1;

                        var newComponents = this.state.gridComponents;
                        newComponents[index] = <div style={{
                                                        gridArea: row+" / "+column+" / span "+width+" / span "+height,
                                                        backgroundColor: newComponents[index].props.style.backgroundColor
                                                    }}
                                                    draggable="true"
                                                    onDragStart={(e) => {
                                                        e.dataTransfer.setData("index", ""+index);
                                                        e.dataTransfer.setData("height", ""+height);
                                                        e.dataTransfer.setData("width", ""+width);
                                                    }}
                                                    onScroll={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                    }}

                                                >
                                                </div>
                        ;

                        this.setState({
                            gridComponents: newComponents
                        })

                    }}
               />
           );

      return divs;
  }

  promptTextType(content){
      var textType = prompt('Enter text type, (heading or paragraph)');
      var textSize = textType == 'paragraph' ? prompt('Enter point size of text') : null;
      if(textType == 'heading'){
          return(
              <h1>{content}</h1>
          );
      }
      else if(textType == 'paragraph'){
          return(
              <p style={{fontSize: {textSize}}}>{content}</p>
          );
      }
      //possibly refactor to use try catch
      else{
          alert('please enter valid text type')
      }

  }

  promptTextContent(){
      var content = prompt('Enter text');
      var contentTag = this.promptTextType(content);
      return(
          {contentTag}
      );
  }



  addTestComponent(e) {
    var id = e.currentTarget.id;
    var row = Math.floor(id / 10) + 1;
    var column = id % 10 + 1;

    var height = parseInt(prompt("Enter column span"));
    var width = parseInt(prompt("Enter row span"));
    var color = prompt("Enter the color of the component");
    var contentType = prompt("Enter media type (text, image, none)");
    if(contentType != 'null'){
        var content =  contentType == 'text' ? this.promptTextContent() : this.promptImageContent
    }

    var newComponents = this.state.gridComponents;
    var newIndex = newComponents.length;
    newComponents.push(
        <div style={{
                 gridArea: row+" / "+column+" / span "+width+" / span "+height,
                 backgroundColor: color
             }}
             draggable="true"
             onDragStart={(e) => {
                 e.dataTransfer.setData("index", ""+newIndex);
                 e.dataTransfer.setData("height", ""+height);
                 e.dataTransfer.setData("width", ""+width);
             }}
             onScroll={(e) => {
                 e.stopPropagation();
                 e.preventDefault();
             }}
        >
            {content}
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
      <div className="overlay-grid"
           onScroll={(e) => {
               document.getElementsByClassName("app")[0].scrollTop = e.currentTarget.scrollTop;
           }}
      >
          {this.state.gridComponents}
      </div>
    ];
  }

}

export default App;
