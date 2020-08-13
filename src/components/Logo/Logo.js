import React from 'react';

import applogo from '../../assets/logo.png';
import classes from './Logo.css';

const logo =(props)=>(
    <div className={classes.Logo} style={{height:props.height}} >
        <img src = {applogo} alt="=logo"/>
    </div>
);

export default logo;