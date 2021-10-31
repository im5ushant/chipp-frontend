import React from 'react';

import './MenuItem.css';

const MenuItem = props => {
    return (
        <div className={`menuitem__container ${props.classes}`} onClick={props.onClick}>
            {props.itemname}
        </div>
    )
}

export default MenuItem;