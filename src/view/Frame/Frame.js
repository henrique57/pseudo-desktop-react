import React from 'react';
import './Frame.css';
import TopBar from '../../components/TopBar';
import Square from '../../components/Square';

export default class Frame extends React.Component {
  constructor(props) {
    super(props);
    const mousePos = {
      x: 0,
      y: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      frame: {
        width: 0,
        height: 0,
      },
      mousePos,
      isLoading: false,
      windows: [],
      maxWindowsNbr: 10,
      windowsCreated: 0,
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      frame: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  _onMouseMove(e) {
    this.setState({ mousePos: { x: e.screenX, y: e.screenY } });
  }

  _renderTopBar = () => {
    if (!this.state.isLoading) {
      return (
        <TopBar
          width={this.state.frame.width}
          addButton={this._renderNewWindows}
        />
      );
    }
  };

  _getRandomInteger = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

  _getWindowColor = () => {
    const colorNbr = this._getRandomInteger(0, 5);

    switch (colorNbr) {
      case 0:
        return 'red';
      case 1:
        return 'green';
      case 2:
        return 'purple';
      case 3:
        return 'yellow';
      default:
        return 'blue';
    }
  };

  _closeWindow = id => {
    const windows = this.state.windows.filter(value => value.props.id !== id);
    this.setState({ windows });
  };

  _bringToTopView = id => {
    if (this.state.windows[this.state.windows.length - 1].props.id !== id) {
      const element = this.state.windows.find(value => value.props.id === id);
      let windows = this.state.windows.filter(
        value => value.props.id !== element.props.id
      );
      windows.splice(this.state.windows.length - 1, 0, element);
      this.setState({ windows });
    }
  };

  _renderNewWindows = () => {
    if (this.state.windows.length < this.state.maxWindowsNbr) {
      const tempWindows = this.state.windows.concat(
        <Square
          id={this.state.windowsCreated}
          key={this.state.windowsCreated}
          borderLimit={this.state.frame}
          color={this._getWindowColor()}
          closeWindow={this._closeWindow}
          size="large"
          onFocus={this._bringToTopView}
        />
      );
      this.setState({
        windows: tempWindows,
        windowsCreated: this.state.windowsCreated + 1,
      });
    }
  };

  _renderWindows = () => this.state.windows;

  render() {
    return (
      <div
        className="detectArea noselect"
        onMouseMove={this._onMouseMove.bind(this)}
        style={this.state.frame}
      >
        {this._renderTopBar()}
        {this._renderWindows()}
      </div>
    );
  }
}
