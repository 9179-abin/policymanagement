import React from 'react';
import Aux from '../../hoc/Auxilary';
import Modal from '../UI/Modal/Modal';
import { Link } from 'react-router-dom';
const homeView = (props)=>{
    return(
      <Aux>
         
              <Modal>
                <h3><strong>Policy Management App</strong></h3>
                    <p>Now manage your policies from anywhere at anytime!</p>
                    <Link className="btn btn-primary btn-lg w-50" to="/login">Login</Link>
                    <br></br>
                    <br></br>
                    <Link className="btn btn-danger btn-lg w-50" to="/register">Register</Link>
               
              </Modal>
         

            
      </Aux>
     

    );
}

export default homeView;