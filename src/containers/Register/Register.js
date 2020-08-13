import React, { Component} from 'react';
import classes from './Register.css';
import axios from '../../axios-store';
import { storage } from '../../fileUpload';

import UserForm from '../DashBoard/UserForm/UserForm';

class Register extends Component{

    state = {
        aftersubmit:false,
        url:"",
        errs:'',
        progress:0,
        id:null,
        registerForm: {
            name: {
                label:'Name:',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Full Name'
                },
                value: ''
            },
            username: {
                label:'User Name:',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: ''
            },
            password : {
                label:'Password:',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: ''
            },
            address: {
                label:'Address:',
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: ''
            },
            citizenship: {
                label:'Citizen:',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: 'Select Citizenship'},
                        {value: 'indian', displayValue: 'Indian'},
                        {value: 'chinese', displayValue: 'Chinese'},
                        {value: 'american', displayValue: 'American'}
                    ],
                    placeholder: 'Citizenship'
                },
                value: ''
            },
            country: {
                label:'Country:',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: 'Select Country'},
                        {value: 'india', displayValue: 'India'},
                        {value: 'china', displayValue: 'China'},
                        {value: 'america', displayValue: 'America'}
                    ],
                    placeholder: 'Country now residing'
                },
                value: ''
            },
            state: {
                label:'State:',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: ''
            },
            email: {
                label:'Email-ID:',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'name@gmail.com'
                },
                value: ''
            },
            gender: {
                label:'Gender:',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: 'Select Gender'},
                        {value: 'male', displayValue: 'Male'},
                        {value: 'female', displayValue: 'Female'},
                        {value: 'other', displayValue: 'Other'},
                    ],
                    placeholder: 'Gender'
                },
                value: ''
            },
            maritalStatus: {
                label:'Marital Status:',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: 'Select Marital Status'},
                        {value: 'single', displayValue: 'Single'},
                        {value: 'married', displayValue: 'Married'}
                    ],
                    placeholder: 'Marital Status'
                },
                value: ''
            },
            contactNumber: {
                label:'Contact No:',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Contact Number'
                },
                value: ''
            },
            IDNumber: {
                label:'ID number:',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ID number'
                },
                value: ''
            },
            dateOfBirth: {
                label:'Date of Birth:',
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                },
                value: ''
            },
            idType: {
                label:'ID Type:',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: null, displayValue: 'Select ID Type'},
                        {value: 'aadhar', displayValue: 'Aadhar'},
                        {value: 'passport', displayValue: 'Passport'},
                        {value: 'pan card', displayValue: 'Pan Card'},
                        {value: 'voter id', displayValue: 'Voter ID'}
                    ],
                    placeholder: 'Marital Status'
                },
                value: ''
            }
            
        },
        file:null,
        cnt:null
    }
    componentDidMount(){
        const random = Math.floor(Math.random()*(999-100+1)+100);
        const id = ['R',random].join('-');
        this.setState({id:id});
        this.setState({errs:''});
        }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({aftersubmit:true});
        // console.log(this.state);
        const uploadTask = storage.ref(`${this.state.id}/${this.state.file.name}`).put(this.state.file);
        uploadTask.on(
            "state_changed",
            snapshot =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                this.setState({progress:progress});
            },
            error=>{
                console.log(error);
            },
            ()=>{
                storage
                    .ref(`${this.state.id}`)
                    .child(this.state.file.name)
                    .getDownloadURL()
                    .then(url =>{
                        this.setState({url:url});
                    });
            }
        );
        const formData = {};
        formData["id"] = this.state.id;
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }
        
        axios.post( '/'+this.state.registerForm.username.value+'.json', formData )
            .then( response => {
                alert("Registration Successfull!! Please Login Again");
                this.props.history.push( '/' );
            } )
            .catch( error => {
                console.log(error);
            } );
       
    };

    isValidAge(dob){
        let today = new Date();
        let year = today.getFullYear();
        let b = dob.split('-');
        let birthyear = b[0];
        if(((year-birthyear)>=18) && ((year-birthyear)<=96) ){
            return true;
        }
        else{
            return false;
        }
    }

    isValidName(name){
        return /^[a-zA-Z\s]+$/.test(name);
    }

    isValidEmail(email) {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
      }
      
      isValidMobile(mobileno) {
        return /^[6-9]\d{9}$/.test(mobileno);
      } 
      
      validateField(field, value) {
        if(value.length<=0) {
          return <div className="alert alert-danger"><span className="text-capitalize">{field}</span> is required field.</div>;
        } else {
            if(field==="name"){
              if(!this.isValidName(value))
                return <div className="alert alert-danger">Invalid Name, *Hint: should contain only alphabets and spaces</div>
            }
           else if(field==="email")       {
            if(!this.isValidEmail(value))
            return <div className="alert alert-danger">Invalid Email. *Hint: should contain '@' and '.'</div>;
          } else if(field==="contactNumber") {
            if(!this.isValidMobile(value))
            return <div className="alert alert-danger w-100">Invalid Mobile Number. *Hint: 'only numbers allowed!!' || '10 digits required!!'</div>;
          }
          else if(field === "dateOfBirth"){
              if(!this.isValidAge(value)){
                return <div className="alert alert-danger w-100">Invalid Age..!  Age should be between: (18 - 96)</div>;
              }
          }
          else {
            return '';
          }
        }
      }
      
      handleBlur=(event) =>{
          this.setState({ errs : this.validateField(event.target.name, event.target.value) });
      }

    inputChangedHandler = (event) => {
        const updatedOrderForm = {
            ...this.state.registerForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[event.target.name]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[event.target.name] = updatedFormElement;
        this.setState({registerForm: updatedOrderForm});
        
    }
    inputChangedHandlerRegion = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.registerForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({registerForm: updatedOrderForm});
        
    }
    handleChange=(event)=>{
        if(event.target.files[0]){
            this.setState({file:event.target.files[0]});
        }
    }

    showState=(event)=>{
        event.preventDefault();
        console.log(this.state.registerForm);
    }

    render(){

        let progressbar = this.state.aftersubmit ? 
        <progress className="progress-bar progress-bar-striped progress-bar-animated bg-success" aria-valuemin="0" aria-valuemax="100" value={this.state.progress} /> : null;

        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                
                 <div className="input-group  form-group content-center">{this.state.errs}</div>

                 <UserForm
                    form={this.state.registerForm}
                    changed={(event)=>this.inputChangedHandler(event)}
                    blur={this.handleBlur}
                    statechanged={(event)=>this.inputChangedHandlerRegion(event,"state")}
                    date={ <div className="input-group mb-3 form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Date of Birth</span>
                                </div>
                                <input name="dateOfBirth" type="date" className="form-control"  onChange={(event) => this.inputChangedHandler(event,"dateOfBirth")} onBlur={this.handleBlur}/>
                            </div>}
                    countrychanged={(event)=>this.inputChangedHandlerRegion(event,"country")}
                    bar={progressbar}
                    fileupload={<input type="file" onChange={this.handleChange} required/>}/> 
                    <hr></hr>
                    <div className="row justify-content-center">
                            
                           
                            <button type="submit" className="btn btn-success " >Register</button>
                            <button type="reset" className="btn btn-danger ml-2 ">Reset</button>
                    </div>
                
            </form>
        );
        return(
            <div>
                <div className={classes.Register}>
                <h4>Enter your Contact Data</h4>
                <hr></hr>
                {form}
            </div>
            </div>
        );
    }
}

export default Register;