import React from 'react';
import './TopBar.css';
import Button from './Button';

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    const { width } = this.props;
    this.state = {
      height: 45,
      width: width,
    };
  }

  componentWillUpdate() {
    const { width } = this.props;
    this._setNewProps(width);
  }

  _setNewProps = width => {
    if (this.state.width !== width) {
      console.log(this.state.width, ' ', width);
      this.setState({ width: width });
    }
  };

  render() {
    const { height, width } = this.state;
    const style = {
      height,
      width,
    };
    return (
      <div className={'menuBar'} style={style}>
        <Button onClick={this.props.addButton} />
      </div>
    );
  }
}
