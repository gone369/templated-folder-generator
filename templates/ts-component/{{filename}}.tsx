import * as React from 'react';
import * as style from './{{filename}}.less';

interface IProps {
  children?: JSX.Element[];
}

interface IState {
  foo: boolean;
}

class {{component.name.capitalizedSnakeCase}} extends React.Component<IProps>{
  static defaultProps = {
  }
  state = {
    foo: false
  }
  /*
  componentDidMount(){
  }
  shouldComponentUpdate(nextState,nextProps){
    return true;
  }
  componentDidUpdate(prevProps,prevState){
  }
  componentWillUnmount(prevProps,prevState){
  }
  */
  render(){
    return (
      <div className={style.{{component.name.snakeCase}} }>
        {{component.name.original}}
      </div>
    );
  }
}

export default {{component.name.capitalizedSnakeCase}};
