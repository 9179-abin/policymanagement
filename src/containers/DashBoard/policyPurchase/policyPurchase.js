import React from 'react';
import Auxilary from '../../../hoc/Auxilary';

const policyPurchase = (props)=>{
    return(
            <Auxilary>
                        <h4>Select Policy you want</h4>
                        <div className="input-group  form-group content-center">{props.errors}</div>
                        <form onSubmit={props.submit}>
                            <div className="input-group mt-3 mb-3 form-group">
                                    <div className="input-group-prepend">
                                         <span className="input-group-text">Policy Type</span>
                                  </div>
                                   <select name="policyType" className="form-control" onChange={props.changeAction} onBlur={props.blurAction} required>
                                         <option value="">Choose one policy</option>
                                         <option value="Medical_Policy">Medical</option>
                                         <option value="Housing_Policy">Housing</option>
                                         <option value="Automotive_Policy">Automotive</option>
                                         <option value="Medical_Family_Policy">Medical Family Coverage</option>
                                     </select>
                                 </div>

                             <div className="input-group mb-3 form-group">
                             <div className="input-group-prepend">
                                  <span className="input-group-text">Policy amount</span>
                             </div>
                             <select name="policyAmount" className="form-control" onChange={props.changeAction} onBlur={props.blurAction} required>
                                         <option value="">Choose one plan</option>
                                         <option value="200000">2,00,000</option>
                                         <option value="150000">1,50,000</option>
                                         <option value="100000">1,00,000</option>
                                         <option value="75000">75,000</option>
                                         <option value="50000">50,000</option>
                                     </select>
                                 </div>
                                <div className="input-group mb-3 form-group">
                                      <div className="input-group-prepend">
                                         <span className="input-group-text">Date of Active</span>
                                    </div>
                                    <input type="text" name="policyActiveDate" className="form-control"  value={props.date} disabled/>
                                </div>
                                <div className="input-group mb-3 form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Date of Active(Yrs)</span>
                                   </div>
                                   <select name="policyDuration" className="form-control" onChange={props.changeAction} onBlur={props.blurAction} required>
                                         <option value="5">5</option>
                                         <option value="10">10</option>
                                         <option value="15">15</option>
                                         <option value="20">20</option>

                                   </select>
                                </div>
                                <div className="row justify-content-center">
                                    <button type="submit" className="btn btn-success " >Purchase</button>
                                    <button type="reset" className="btn btn-danger ml-2 ">Reset</button>
                                </div>
                         </form>
                </Auxilary>




    );
}


export default policyPurchase;