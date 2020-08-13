import React from 'react';
import classes from './NavigationItems.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


const navigationItems = (props) => {
  
    let links = null;

    if(props.ctr===false){
        links = (
       <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}>
            <NavLink to="/" exact activeClassName={classes.active}>Home</NavLink>
        </li>
        <li className={classes.NavigationItem}>
            <NavLink to="/login" activeClassName={classes.active} >Login</NavLink>
        </li>
        <li className={classes.NavigationItem}>
            <NavLink to="/register" activeClassName={classes.active} >Register</NavLink>
        </li>
        </ul>);
    }
    if(props.ctr===true){
        links = (
            <ul className={classes.NavigationItems}>
                <li className={classes.NavigationItem}>
                    <NavLink to="/" exact activeClassName={classes.active} onClick={props.onLogout}>Logout</NavLink>
                </li>
            </ul>

        );
    }

return(
    <div>
        {links}
    </div>
    
);

}

const mapAction = dispatch =>{
    return {
        onLogout : () => dispatch({type: "LOG_OUT"})
    };
}

const mapStateToProps = state=>{
   return { 
       ctr: state.logedIn
   };
};

export default connect(mapStateToProps, mapAction)(navigationItems);