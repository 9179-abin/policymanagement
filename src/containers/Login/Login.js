import React, { Component} from 'react';
import classes from './Login.css';
import axios from '../../axios-store';
import { connect } from 'react-redux';


class Login extends Component{
    state={
        username:"",
        password:"",
        userpass:null,
        userid:null

    };
    inputChangeHandler=(event)=>{
        event.preventDefault();
        this.setState({username:this.refs.username.value});
        this.setState({password:this.refs.password.value});

        axios.get(`/${this.refs.username.value}.json`)
        .then(res=>{
            const data = Object.values(res.data);
            this.setState({userpass:data[0].password});
            this.setState({userid:data[0].id});
            if(this.state.password=== data[0].password){
                this.props.onLogin();
                alert("Login Successfull");
                
                this.props.history.replace( {
                    pathname:'/dashboard',
                search: '?query=abc',
            state:{detail: data[0],
            key:Object.keys(res.data)}} );
            }
            else{
                alert("Incorrect Username or Password!");
                this.props.history.replace( '/home' );
            }
            })
               
            .catch(err => {
                alert("Incorrect Username or Password!");
                this.props.history.replace( '/home' );
            });
    }

    render(){
        return(
           
            <div className={classes.Login}>
                <h4>Enter Your Credential:</h4>
                <hr></hr>
                
                <form onSubmit={this.inputChangeHandler}>
                    <div className="input-group mt-3 mb-3 form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Username</span>
                        </div>
                        <input ref="username" type="text" className="form-control"/>
                    </div>

                    <div className="input-group mb-3 form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Password</span>
                        </div>
                        <input ref="password" type="password" className="form-control" />
                    </div>
                    <div className="row justify-content-center">
                            <button type="submit" className="btn btn-success " >Login</button>
                            <button type="reset" className="btn btn-danger ml-2 ">Reset</button>
                    </div>
                   
                    

                </form>
                
               
            </div>
           
        );
    }
}
const mapAction = dispatch =>{
    return {
        onLogin : () => dispatch({type: "LOGIN"})
    };
};
const mapStateToProps = state=>{
    return { 
        ctr: state.logedIn
    };
 };

export default connect(mapStateToProps,mapAction)(Login);