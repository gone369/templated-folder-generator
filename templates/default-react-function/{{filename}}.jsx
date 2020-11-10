import React from 'react';
import './{{filename}}.css'

export default function {{component.name.capitalizedCamelCase}}(props){
  return (
    <div className="{{component.name.camelCase}}">
      {{component.name.original}}
    </div>
  )
}

{{component.name.capitalizedCamelCase}}.defaultProps = {
}
