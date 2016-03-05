import React  from 'react';
import ReactDOM  from 'react-dom';

var ColorPicker = React.createClass({
  getInitialState : function(){
    return {
      red : 150,
      green : 150,
      blue : 150
    };
  },

  render : function() {
    return (
      <div>
        <div
          style={{
            width : 1200,
            height : 500,
            margin : 2,
            border : '2px solid black',
            backgroundColor : `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`
          }}
        />
        <div>
          <input
            type='range'
            value={this.state.red}
            onChange={
              (e) => this.setState({red: e.target.value})
            }
            min={0}
            max={255}
          />
          RED
        </div>
        <div>
          <input
            type='range'
            value={this.state.green}
            onChange={
              (e) => this.setState({green: e.target.value})
            }
            min={0}
            max={255}
          />
          GREEN
        </div>
        <div>
          <input
            type='range'
            value={this.state.blue}
            onChange={
              (e) => this.setState({blue: e.target.value})
            }
            min={0}
            max={255}
          />
          blue
        </div>
      </div>
    );
  }
});
ReactDOM.render(<ColorPicker/>, document.querySelector('#main'));
{/*
    1.  How do you style MARGIN with different values 2px, 40px?
    2.  Same with BORDER sold 2px black?
    3. Finally fully understood syntax, punctuation for render{}; return;
    4. Repeated this fully several times including the React.createClass
    5. fat function more comfy with. doing over and over jogged my todo list mem
    6. this.setState made many mistakes there but get it now ex. this.state.red...this.setState{()}
    7. better with self closing tags, input / div style
*/}
