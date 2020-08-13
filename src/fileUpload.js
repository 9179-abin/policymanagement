import firebase from 'firebase/app';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD6GBwaKQKoCoVvVCXtZmdiwSviyku86uA",
    authDomain: "policy-management-app.firebaseapp.com",
    databaseURL: "https://policy-management-app.firebaseio.com",
    projectId: "policy-management-app",
    storageBucket: "policy-management-app.appspot.com",
    messagingSenderId: "718889869907",
    appId: "1:718889869907:web:8181a0b825d9db70d75ca6",
    measurementId: "G-N5NW4NJ3ZE"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };