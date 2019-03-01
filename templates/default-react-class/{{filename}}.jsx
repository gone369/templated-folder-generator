import React, { Component } from 'react';
import './{{filename}}.css'

export default {{component.name.capitalizedSnakeCase}} extends Component{
  static defaultProps = {
  }
  state = {
  }
  /*
  componentWillMount(){
  }
  componentDidMount(){
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }
  componentWillReceiveProps(nextProps,nextState){
    return true;
  }
  componentWillUpdate(nextProps,nextState){
  }
  componentDidUpdate(prevProps,prevState){
  }
  componentWillUnmount(prevProps,prevState){
  }
  */
  render(){
    return (
      <div className="{{component.name.snakeCase}}">
        {{component.name.original}}
      </div>
    )
  }
}
