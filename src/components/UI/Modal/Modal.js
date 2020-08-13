import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxilary';

const modal =(props)=>(
    <Aux>
        <div className={classes.Modal}>
            {props.children}
        </div>
    </Aux>
);

export default modal;