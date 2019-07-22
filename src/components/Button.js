import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import './Button.css';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    const unpressedButtonStyle = {
      margin: 5,
      color: 'rgb(255,255,255)',
    };
    const pressedButtonStyle = {
      margin: 5,
      color: 'rgba(255,255,255,0.5)',
    };
    this.state = {
      height: 60,
      width: width,
      isTimeoutActivated: false,
      unpressedButtonStyle,
      pressedButtonStyle,
      buttonStyle: unpressedButtonStyle,
    };
  }

  componentWillMount() {
    this.timeoutButton = 0;
  }

  componentWillUpdate() {
    const { width } = this.props;
    this._setNewProps(width);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutButton);
    this.timeoutButton = 0;
  }

  _setNewProps = width => {
    if (this.state.width !== width) {
      console.log(this.state.width, ' ', width);
      this.setState({ width: width });
    }
  };

  _onClick = () => {
    if (!this.state.isTimeoutActivated) {
      this.props.onClick();
      this.setState({
        isTimeoutActivated: true,
        buttonStyle: this.state.pressedButtonStyle,
      });
      this.timeoutButton = setTimeout(() => {
        this.setState({
          isTimeoutActivated: false,
          buttonStyle: this.state.unpressedButtonStyle,
        });
      }, 250);
    }
  };

  render() {
    return (
      <div className="buttonDiv">
        <MdAddCircleOutline
          className="icon"
          style={this.state.buttonStyle}
          onClick={this._onClick}
        />
      </div>
    );
  }
}
