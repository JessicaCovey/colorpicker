import React  from 'react';
import ReactDOM  from 'react-dom';

var App = React.createClass({
  getInitialState : function () {
    return {};
  },

  render : function () {
    return (
      <div/>
    );
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
