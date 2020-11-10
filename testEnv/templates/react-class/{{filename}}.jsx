import React, { Component } from 'react';
import './{{filename}}.css'

export default {{component.name.capitalizedCamelCase}} extends Component{
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
      <div className="{{component.name.camelCase}}">
        {{component.name.original}}
        {{component.name.snakeCase}}
        {{component.name.lowerCasedSnakeCase}}
        {{component.name.hyphen}}
        {{component.name.lowerCasedHyphen}}
        {{component.name.lowerCase}}
        {{component.name.upperCase}}
        {{component.name.camelCase}}
        {{component.name.capitalizedCamelCase}}
      </div>
    )
  }
}
