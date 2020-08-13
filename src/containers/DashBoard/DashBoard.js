import React,{ Component } from 'react';
import Auxilary from '../../hoc/Auxilary';
import axios from '../../axios-store';
import classes from './DashBoard.css';
import PolicyPurchase from './policyPurchase/policyPurchase';
import ViewPolicy from '../DashBoard/viewPolicy/viewPolicy';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import UserForm from '../DashBoard/UserForm/UserForm';
import { connect } from 'react-redux';


class DashBoard extends Component{
    state={
        logedUser:'',
        errs:'',
        isUpdating: false,
        isPurchasing: false,
        isViewing:false,
        key:null,
        date:null,
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
            },
            IDNumber: {
                label:'ID number:',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ID number'
                },
                value: ''
            }
        },
        policyForm:{
            policyType: null,
            policyAmount:0,
            policyActiveDate:"",
            policyDuration:0
        },
        userpolicies:[]
    };


    componentDidMount(){
        const data = this.props.location.state.detail;
        const key = this.props.location.state.key;
        this.setState({key:key});
        this.setState({logedUser:data});
        const ss = {...data};
        let s = [];
        for(let key in ss){
            if(key!=="id" && key!=="dateOfBirth" ){
                s.push(key);
            }
           
        }
        this.setState({keys:s});
        this.setState({errs:''});
        let today = new Date();

        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const pf = {
            ...this.state.policyForm
        };
        pf["policyActiveDate"]=date;
        this.setState({policyForm:pf});
    }

    showState=()=>{
          console.log(this.state.keys,this.state.logedUser);
        
        }

        valUpdateHandler=()=>{
           const ss = [...this.state.keys];
           let p ={...this.state.registerForm};
           const q = {...this.state.logedUser};
           for(let key in ss){
            let u = {...p[ss[key]]};
            u.value = q[ss[key]];
            p[ss[key]] = u;
           }
           this.setState({registerForm:p});
           this.setState({isUpdating:true});
        }

        onRefresh=()=>{
            this.props.history.replace( '/home' );
        }

        policyViewHandler=()=>{
            axios.get(`User_Policies/${this.state.logedUser.username}Policies/.json`)
            .then(res=>{
                // console.log(res.data);
                let policies =[];
                for(let key in res.data){
                    policies.push({
                        ...res.data[key],
                        id : key
                    });
                }
                this.setState({userpolicies:policies});
                this.setState({isPurchasing:false, isUpdating:false, isViewing:true});
            })
            .catch(err=>{
                alert("You have no Active Policies!!!");
            });
        }

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
              }  else if(field === "dateOfBirth"){
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

        handlePolicyChange=(event)=>{
            const policyForm = {
                ...this.state.policyForm
            };
            policyForm[event.target.name]=event.target.value;
            this.setState({policyForm:policyForm});
            // console.log(this.state.policyForm);
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

        onPolicyClickedHandler=(id)=>{
            
            const input = document.getElementById(id);
            html2canvas(input)
            .then((canvas) => {
             const imgData = canvas.toDataURL('image/png');
          
        
         
            const pdf = new jsPDF('p', 'mm', [300, 300]);
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf"); 
        });
        }

        updateDataHandler=(event)=>{
            event.preventDefault();
            const ss = [...this.state.keys];
            let p ={...this.state.registerForm};
            const q = {...this.state.logedUser};
            console.log(q);
            for(let key in ss){
                let u = {...p[ss[key]]};
                q[ss[key]] = u.value;
            }
            const formData = {};
            formData["id"] = this.state.logedUser.id;
            formData["idType"] = q["idType"];
            formData["dateOfBirth"] = this.state.logedUser.dateOfBirth;
            // console.log(formData);
            for (let formElementIdentifier in this.state.registerForm) {
                formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
            }
            
            axios.put( '/'+this.state.registerForm.username.value+'/'+this.state.key+'/.json', formData )
            .then( response => {
                alert("Updation Successfull!!");
                this.setState({logedUser:q});
                this.setState({isUpdating:false});
            } )
            .catch( error => {
                console.log(error);
            } );
        }
        onDashBoard=()=>{
            this.setState({isViewing:false});
            this.setState({isPurchasing:false});
            this.setState({isUpdating:false});
        }
        cancelHandler=()=>{
            this.setState({isUpdating:false});
        }

        onpurchaseHandler=()=>{
            this.setState({isUpdating:false});
            this.setState({isViewing:false});
            this.setState({isPurchasing:true});
        }
        policyPurchaseHandler=(event)=>{
            event.preventDefault();
            const PolicyData = {};
            for(let ky in this.state.policyForm){
                PolicyData[ky]=this.state.policyForm[ky];
            }
            axios.post(`User_Policies/${this.state.logedUser.username}Policies/.json`,PolicyData)
            .then( response => {
                alert("Policy Purchase Successfull!!");
                this.setState({isUpdating:false,isViewing:false,isPurchasing:false});
            } )
            .catch( error => {
                console.log(error);
            } );

        }

    render(){

        const formElementsArray = [];
        for (let key in this.state.registerForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.registerForm[key]
                });
        }
        let form = (

            <UserForm
            form={this.state.registerForm}
            changed={(event)=>this.inputChangedHandler(event)}
            blur={this.handleBlur}
            statechanged={(event)=>this.inputChangedHandlerRegion(event,"state")}
            countrychanged={(event)=>this.inputChangedHandlerRegion(event,"country")}/>          
        );

       let component = !this.state.isUpdating ? 
            (<div>
                 <div className="card-body text-left pl-5 pt-2">
                    <div><strong>User Id:</strong> {this.state.logedUser.id}</div>
                    <div><strong>E-mail:</strong> {this.state.logedUser.email}</div>
                    <div><strong>Mobile:</strong> {this.state.logedUser.contactNumber}</div>
                    <div><strong>Date of Birth:</strong> {this.state.logedUser.dateOfBirth}</div>
                    <div><strong>Citizenship:</strong> {this.state.logedUser.citizenship}</div>
                    <div><strong>State:</strong> {this.state.logedUser.state}</div>
                    <div><strong>Country:</strong> {this.state.logedUser.country}</div>
                    </div>
                    <button onClick={this.valUpdateHandler} className="btn btn-success ">Update Details</button>
                    </div>)
                    :
                    (<form onSubmit={this.updateDataHandler}>
                        <h3>Update your Details</h3>
                        <div className="input-group  form-group content-center">{this.state.errs}</div>
                    {form}
                    <div className="row justify-content-center">
                            <button type="submit" className="btn btn-success " >Update</button>
                            <button type="reset" className="btn btn-danger ml-2 ">Reset</button>
                            <button onClick={this.cancelHandler} className="btn btn-danger ml-2 ">Cancel</button>
                    </div>
            </form>);
            if(this.state.isPurchasing===true){
                component = <PolicyPurchase 
                blurAction={this.handleBlur}
                errors = {this.state.errs}
                date={this.state.policyForm.policyActiveDate}
                changeAction={this.handlePolicyChange}
                submit={this.policyPurchaseHandler}/>;
            }
            if(this.state.isViewing===true){
                component= (<div>
                <h3 key="heading">Purchased Policies</h3>
                <p>(*Click policies to download copy)</p>
                {this.state.userpolicies.map((policy)=>(
                    <ViewPolicy key={policy.id} kl={policy.id} policy = {policy} clicked={()=>this.onPolicyClickedHandler(policy.id)}/> 
                ))}
                </div>);
            }
            // const s = this.

        return(
           this.props.ctr ? <Auxilary>
                <div className="row">
                <div className="btn btn-outline-primary mx-auto mb-2 ml-0 " onClick={this.onDashBoard}>
                        <a  className="card border-0 bg-transparent text-white  card-templates shadow-lg">
                            <div className="card-body d-flex align-items-end flex-column text-left">
                                <h4>Welcome <strong>{this.state.logedUser.name}</strong></h4>
                            </div>
                        </a>
                </div> 
                    <div className=" btn btn-primary mb-lg-0  mb-2 mx-auto">
                    
                        <a onClick={this.onpurchaseHandler} className="card bg-transparent pointer-cursor mr-0 text-white border-white border-2 card-templates shadow-lg ">
                            <div className="card-body d-flex align-items-end flex-column text-right" > 
                                <h4>Purchase Policies</h4>
                                <p className="w-40">click here to view all policies to purchase</p>
                            </div>
                        </a>
                    </div> 
                    <div className="btn btn-primary mb-lg-0  mb-2  mx-auto" >
                        <a  className=" card bg-transparent text-white border-white border-2 card-templates shadow-lg" onClick={this.policyViewHandler}>
                            <div className="card-body d-flex align-items-end flex-column text-right">
                                <h4>View Policies</h4>
                                <p className="w-40">Click to view policies you purchased</p>
                            </div>
                        </a>
                    </div> 
                   
                    
            </div>
            <div className="row">
                
                    <div className={classes.Update} >
                   
                        {component}

                     </div>
            </div>
            </Auxilary>: <div><h1>Your session expired, please login again! </h1></div>
            
            
        );
    }
}



const mapStateToProps = state=>{
   return { 
       ctr: state.logedIn
   };
};

export default connect(mapStateToProps)(DashBoard);