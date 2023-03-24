import React, { useState, useEffect, useCallback} from 'react'; 

import Card from '../UI/Card';
import classes from './AddUser.module.css' ;
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal' ;
function AddUser() {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [errorModal, setErrorModal] = useState(null)

    function namedChangeHandler(event){
        setName(event.target.value)
    }
    function ageChangeHandler(event){
        setAge(event.target.value);
    }
    function emailedChangeHandler(event){
        setEmail(event.target.value)
    }
    function passedChangeHandler(event){
        setPass(event.target.value)
    }

    async function sendDataHandler(event){
        
  
        const my_object={
          name: name,
          age: age,
          pass: pass,
          email: email
        }
  
        console.log(my_object);
        
        const res = await fetch('https://login-e24ee-default-rtdb.firebaseio.com/testowa.json',
        {
          method: 'POST',
          body: JSON.stringify(my_object),
          headers:{
            'Content-Type': 'application.json'
          }
  
        }) ;
         const data = await res.json() ;
         setAge('')
        setName('')
        setEmail('')
        setPass('')
        
    }
    const getDataHandler = useCallback( async () => {
        const res = await fetch('https://login-e24ee-default-rtdb.firebaseio.com/testowa.json')
        
        const data = await res.json()
  
        const loadedData = []
        for(const key in data){
          loadedData.push({
            name : data[key].name,
            age : data[key].age,
            email : data[key].email,
            pass : data[key].pass
              
          })
        }
        console.log(data)
        console.log(loadedData)
        
        
        
    }
    )
    
    useEffect( () => {
      getDataHandler()
     }, [getDataHandler])
  
  
    



    function addUserHandler(event){
        event.preventDefault();
        if(name == '' ){
            setErrorModal({
                title:"brak imienia",
                msg:"wpisz imie"
            })
        }
         if(age == ""){
            setErrorModal({
                title:"Brak wieku",
                msg:"wpisz wiek",
                
            })
        }
        if(age < 1){
            setErrorModal({
                title:"Błędny wiek",
                msg:"Wiek musi być > 0"
            })
        }
         if(email == ""){
            setErrorModal({
                title:"brak email'u",
                msg:"wpisz email"
            })
        }
         if(pass == ""){
            setErrorModal({
                title:"Błędne hasło",
                msg:"wpisz hasło"
            })
        }
        else{
            console.log("gowno dziala")
            sendDataHandler(event)
        }
    }
    
        
        
        
    const errorHandler = () => {
        setErrorModal(null);
    }
    ;
    return (
    <>
        {errorModal && <ErrorModal title={errorModal.title} 
                                   msg={errorModal.msg}
                                   removeError={errorHandler}/> }
        <Card className={classes.input}>
        <form onSubmit={addUserHandler} >
            <label htmlFor="username">Username</label>
            <input id="username" type="text"
                   onChange={namedChangeHandler} 
                   value={name}
            />

            <label htmlFor="age">Age</label>
            <input id="age" type="Number" 
                    onChange={ageChangeHandler}
                    value={age}
            />
            <label htmlFor="email">email</label>
            <input id='email' type="email"
                onChange={emailedChangeHandler} 
                value={email}
            />

            <label htmlFor="pass">pass</label>
            <input id='pass' type="password" 
                onChange={passedChangeHandler} 
                value={pass}
            />

            <Button myType="submit"> Add user </Button>
            <Button onClick={getDataHandler}>Take data</Button>
        </form>
        </Card>
        </>
    );
    
   
}

export default AddUser ;