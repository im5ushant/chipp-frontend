import React from 'react';

import './Container.css';

const Container = props => {
    
    return(<>
        <div className={`container__${props.classSuffix} ${props.classes}`}>
          {props.children}
        </div>
    </>)
}

export default Container;