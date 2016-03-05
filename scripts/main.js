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
    const {red, green, blue} = this.state;
    return (
      <div>
        <div
          style={{
            width : 900,
            height : 600,
            backgroundColor : `rgb(${red}, ${green}, ${blue})`
          }}
        />
        {
          ['red', 'green', 'blue'].map((color) =>
            <div>
              <input
                type='range'
                value={this.state[color]}
                onChange={
                  (e) => this.setState({[color]: e.target.value})
                }
                min={0}
                max={255}
              />
              {color}
            </div>
          )
        }
      </div>
    );
  }
});
ReactDOM.render(<ColorPicker/>, document.querySelector('#main'));
