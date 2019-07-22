import React from 'react';
import './Square.css';
import { IoIosClose } from 'react-icons/io';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    const { id, color, size, borderLimit } = props;
    const initialPosition = {
      position: 'absolute',
      left: borderLimit.width / 2,
      top: borderLimit.height / 2,
      width: 300,
      height: 300,
    };
    const movingStyle = {
      position: 'relative',
      width: 150,
      height: 150,
    };

    this.state = {
      id,
      movingStyle,
      borderLimit,
      color,
      size,
      initialPosition,
      windowPosition: initialPosition,
      isWindowMoving: false,
      isOverCloseButton: false,
    };
  }

  componentWillUpdate() {
    const { borderLimit } = this.props;
    this._setBorderLimit(borderLimit);
  }

  _getWindowClassName = () => {
    return `${this.state.color}`;
  };

  _onMouseMove(e) {
    if (this.state.isWindowMoving) {
      const { left, top } = this.state.windowPosition;
      const { movementX, movementY } = e;
      let newX,
        newY = 0;

      if (left + movementX < 0) {
        newX = 0;
      } else {
        newX = left + movementX;
      }

      if (top + movementY < 0) {
        newY = 0;
      } else {
        newY = top + movementY;
      }

      this.setState({
        windowPosition: {
          ...this.state.windowPosition,
          left: newX,
          top: newY,
        },
      });
    }
  }

  _handleMouseDown = e => {
    if (this.state.isOverCloseButton) {
      this._closeWindow();
    } else {
      this.props.onFocus(this.state.id);

      this.setState({
        isWindowMoving: true,
      });

      this.setState({
        windowPosition: {
          ...this.state.windowPosition,
          left: e.clientX - 75,
          top: e.clientY - 110,
        },
      });
    }
  };

  // Handle do movimento
  _handleMouseUp = e => {
    console.log('teste');
    this.setState({
      windowPosition: {
        ...this.state.windowPosition,
        left: e.clientX - 110,
        top: e.clientY - 75,
      },
      isWindowMoving: false,
    });
  };

  _handleMouseOut = e => {
    this.setState({
      isWindowMoving: false,
    });
  };

  _setBorderLimit = borderLimit => {
    if (
      this.state.borderLimit.width !== borderLimit.width ||
      this.state.borderLimit.height !== borderLimit.height
    ) {
      this.setState({ borderLimit });
    }
  };

  _getTopBarColor = () => `${this.state.color}-topbar`;

  _closeWindow = () => {
    this.props.closeWindow(this.state.id);
  };

  _onMouseOverCloseButton = () => this.setState({ isOverCloseButton: true });

  _onMouseLeaveCloseButton = () => this.setState({ isOverCloseButton: false });

  _getWindowsStyle = () => {
    if (this.state.isWindowMoving) {
      return { ...this.state.windowPosition, ...this.state.movingStyle };
    }
    return this.state.windowPosition;
  };

  render() {
    return (
      <div
        className={`square ${this._getWindowClassName()}`}
        style={this._getWindowsStyle()}
        onMouseMove={this._onMouseMove.bind(this)}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}
        onMouseOut={this._handleMouseOut}
      >
        <div className={`topBar ${this._getTopBarColor()}`}>
          <div>
            <IoIosClose
              className="closeButton"
              onClick={this._closeWindow}
              onMouseOver={this._onMouseOverCloseButton}
              onMouseLeave={this._onMouseLeaveCloseButton}
            />
          </div>
        </div>
      </div>
    );
  }
}
