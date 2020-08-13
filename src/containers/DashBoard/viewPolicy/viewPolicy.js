import React from 'react';
import { v4 as uuidv4 } from 'uuid';
const viewPolicy = (props) =>{

    let id1 = uuidv4();
    let id2 = uuidv4();
    let id3 = uuidv4();
    let id4 = uuidv4();
    let id5 = uuidv4();
    return(
    <div key={id1} className="btn text-left pl-5 pt-2 border-primary border-2 mb-2 ml-2" id={props.kl} onClick={props.clicked}>
            <p key={id2}>Policy Type: {props.policy.policyType}</p>
            <p key={id3}>Policy Amount: {props.policy.policyAmount}</p>
            <p key={id4}>Policy Duration: {props.policy.policyDuration}</p>
            <p key={id5}>Policy Active Date: {props.policy.policyActiveDate}</p>
    </div>
);
}

export default viewPolicy;