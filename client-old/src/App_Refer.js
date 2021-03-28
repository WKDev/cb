import React, { useEffect, useState } from 'react';
import firebase from './firebase';


const App = () => {
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState('');
  const [age, setAge] = useState('');
  const [refField, setRefField] = useState('');
  const [result, setResult] = useState([]);
  const userRef = firebase.database().ref('users');


  useEffect(() => {
    userRef.on('value', snapshot => {
      const users = snapshot.val();
      const usersData = [];
      for(let id in users) {
        usersData.push({ ...users[id], id });
      }
  
      // setDatas(usersData);
    })
  }, []);

  const onChangeRef =(e)=>{
    setRefField(e.target.value);
  }

  const onClickSearch = () =>{
    userRef.orderByChild('user').equalTo(refField).on("child_added", snapshot =>{
      // setResult(...snapshot.val())

      setResult(snapshot.val().user);
    })
  }

  return (
    <div>
      <input onChange={onChangeRef} placeholder='search...' value={refField}></input>
      <button onClick={onClickSearch}>Search</button>
      <div>{result}</div>
    </div>
  );
};

export default App;
