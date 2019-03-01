import React from 'react';
import './{{filename}}.css'

export default function {{component.name.capitalizedSnakeCase}}(props){
  return (
    <div className="{{component.name.snakeCase}}">
      {{component.name.original}}
    </div>
  )
}

{{component.name.capitalizedSnakeCase}}.defaultProps = {
}
