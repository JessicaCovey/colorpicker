import React  from 'react';
import ReactDOM  from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var ColorPicker = React.createClass({
  getInitialState : function() {
    return {
      selectedPaletteIndex : 0,
      selectedColorIndex : 0,
      palettes : [
        {
          colors : [
            {
              red : 125,
              green : 125,
              blue : 125
            }
          ]
        },
        {
          colors : [
            {
              red : 124,
              green : 120,
              blue : 115
            },
            {
              red : 100,
              green : 150,
              blue : 200
            }
          ]
        },
      ],
    };
  },

  selectColor : function(paletteIndex, colorIndex) {
    this.setState({
      selectedPaletteIndex : paletteIndex,
      selectedColorIndex : colorIndex
    });
  },

  updateColor : function(paletteIndex, colorIndex, key, value) {
    this.state.palettes[paletteIndex].colors[colorIndex][key] = value;
    this.forceUpdate();
  },

  addColor : function(paletteIndex) {
    this.state.palettes[paletteIndex].colors.push({
      red : 100,
      green : 100,
      blue : 100
    });
    this.forceUpdate();
  },

  addPalette : function() {
    this.state.palettes.push({
      colors : [
        {
          red : 100,
          green : 100,
          blue : 100
        }
      ]
    });
    this.forceUpdate();
  },

  fixSelectionIssues : function() {
    const {selectedPaletteIndex, selectedColorIndex, palettes} = this.state;

    if (selectedPaletteIndex >= palettes.length) {
      this.state.selectedPaletteIndex = palettes.length - 1;
    }

    const selectedPalette = palettes[this.state.selectedPaletteIndex];

    if (selectedColorIndex >= selectedPalette.colors.length) {
      this.state.selectedColorIndex = selectedPalette.colors.length - 1;
    }
  },

  removePalette : function(paletteIndex) {
    const {palettes} = this.state;

    if (palettes.length <= 1 ) {
      return;
    }

    this.state.palettes.splice(paletteIndex, 1);
    this.fixSelectionIssues();
    this.forceUpdate();
  },

  removeColor : function(paletteIndex, colorIndex) {
    const {palettes} = this.state;
    const palette = palettes[paletteIndex];

    if (palette.colors.length <= 1) {
      return;
    }

    palette.colors.splice(colorIndex, 1);
    this.fixSelectionIssues();
    this.forceUpdate();
  },

  render : function() {
    const {selectedPaletteIndex, selectedColorIndex, palettes} = this.state;
    const selectedPalette = palettes[selectedPaletteIndex];
    const selectedColor = selectedPalette.colors[selectedColorIndex];

    return (
      <div className='main'>
        <h3>CP</h3>
        <div className='workspace'>
          {
            palettes.map((palette, i) => {
              return (
                <CSSTransitionGroup
                  component='div'
                  className='palette'
                  key={i}
                  transitionName='fade'
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {
                    palette.colors.map((color, j) => {
                      const {red, green, blue} = color;
                      const isSelected = i === selectedPaletteIndex && j === selectedColorIndex;
                      return (
                        <div
                          className='color'
                          key={j}
                          style={{
                            border : isSelected ? '6px solid aliceblue' : 'none',
                            backgroundColor : `rgb(${red}, ${green}, ${blue})`
                          }}
                          onClick={() => this.selectColor(i, j)}
                        >
                          <button
                            className='delete'
                            onClick={(e) => {
                              e.stopPropagation();
                              this.removeColor(i, j);
                            }}
                          >
                            x
                          </button>
                        </div>
                      );
                    })
                  }
                  <div className='button-block'>
                    <button onClick={() => this.addColor(i)}> + C </button>
                    <button onClick={() => this.addPalette()}> - P</button>
                  </div>
                </CSSTransitionGroup>
              );
            })
          }
        </div>
        <div className='controls'>
          <div className='sliders'>
            {
              ['red', 'green', 'blue'].map((color) =>
                <div key={color}>
                  <input
                    type='range'
                    value={selectedColor[color]}
                    min={0}
                    max={255}
                    onChange={(e) =>
                      this.updateColor(
                        selectedPaletteIndex,
                        selectedColorIndex,
                        color,
                        e.target.value
                      )
                    }
                  />
                  {color[0].toUpperCase()}
                </div>
              )
            }
          </div>
          <button className='add' onClick={this.addPalette}> + NEW PALETTE</button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<ColorPicker/>, document.querySelector('#main'));
