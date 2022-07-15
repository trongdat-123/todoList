// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCXh2BriknLIke17WxsvVDz_u9maeAwCeE',
    authDomain: 'todolist-2be10.firebaseapp.com',
    databaseURL: 'https://todolist-2be10-default-rtdb.firebaseio.com',
    projectId: 'todolist-2be10',
    storageBucket: 'todolist-2be10.appspot.com',
    messagingSenderId: '503733005684',
    appId: '1:503733005684:web:7306bcbf75d720b74d5021',
    measurementId: 'G-SXCH2H53Q0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export default database;
