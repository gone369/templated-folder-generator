import * as React from 'react';
import * as style from './index.less';

interface IProps {
  className?: string
}

const {{component.name.capitalizedSnakeCase}}: React.StatelessComponent<IProps> = props => {
  return (
    <div className={ style.{{component.name.snakeCase}} }>
      {{component.name.original}}
    </div>
  );
};

{{component.name.capitalizedSnakeCase}}.defaultProps = {
  className: ''
};

export default {{component.name.capitalizedSnakeCase}};

