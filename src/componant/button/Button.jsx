import React from "react";


class Button extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onClick()} className={this.props.classe} style={{ color: this.props.color, backgroundColor: this.props.bcolor,display:this.props.display }}>
        {this.props.name} 
      </button>
    );
  }
}

export default Button;