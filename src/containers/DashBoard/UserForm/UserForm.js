import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const userForm = (props)=>(
        <div className="row">
            <div className="col-4">
            <div className="input-group mt-3 mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Full name</span>
                </div>
                <input name="name" type="text" placeholder='Your Full Name      ex.Sam Smith  ' value={props.form.name.value} className="form-control"  onChange={props.changed} onBlur={props.blur} required/>
            </div>
            <div className="input-group mt-3 mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Username</span>
                </div>
                <input name="username" type="text" placeholder='Your Username' value={props.form.username.value} className="form-control"  onChange={props.changed} onBlur={props.blur} required/>
            </div>
            {props.date}
            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Citizenship</span>
                </div>
                <input name="citizenship" type="text" className="form-control"  value={props.form.citizenship.value} onChange={props.changed} onBlur={props.blur} required/>
            </div>
            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Marital Status</span>
                </div>
                <select name="maritalStatus"  className="form-control"  onChange={props.changed} onBlur={props.blur}>
                    <option value="">Select Marital Status</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                </select>
            </div>
            </div>
            <div className="col-4">
            <div className="input-group mt-3 mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Password</span>
                </div>
                <input name="password" type="password" placeholder='password' className="form-control"  onChange={props.changed} onBlur={props.blur} required/>
            </div>
        
            <div className="input-group mt-3 mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Address</span>
                </div>
                <textarea name="address" type="text" placeholder='Address' className="form-control" value={props.form.address.value}  onChange={props.changed} onBlur={props.blur} required/>
            </div>
        
            <div className="input-group mt-3 mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Country</span>
                </div>
                <CountryDropdown name="country" className="form-control"  value={props.form.country.value} onChange={props.countrychanged} onBlur={props.blur}/>
            </div>
            
            <div className="input-group mt-3 mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">State</span>
                </div>
                <RegionDropdown  name="state" country={props.form.country.value} value={props.form.state.value} onChange={props.statechanged} />
            </div>

            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">E-mail</span>
                </div>
                <input name="email" type="email" className="form-control" value={props.form.email.value} placeholder="name@gmail.com"  onChange={props.changed} onBlur={props.blur} required/>
            </div>
            </div>
            <div className="col-4">
            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Contact No.</span>
                </div>
                <input name="contactNumber" type="text" className="form-control" value={props.form.contactNumber.value} onBlur={props.blur} onChange={props.changed} required/>
            </div>
            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Gender</span>
                </div>
                <select name="gender"  className="form-control"  onChange={props.changed} onBlur={props.blur}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            
            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">ID Type</span>
                </div>
                <select name="idType"  className="form-control"  onChange={props.changed} onBlur={props.blur}>
                    <option value="">Select ID Type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                </select>
                
                
            </div>
            <div className="input-group mb-3 form-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">ID Number</span>
                </div>
                <input name="IDNumber" type="text" className="form-control" value={props.form.IDNumber.value}  onChange={props.changed}  onBlur={props.blur} required/>
            </div>
             {props.fileupload}
             {props.bar}
            </div>
        </div>
);

export default userForm;