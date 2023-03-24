import { useState, useEffect, useCallback } from 'react';

function App() {

    const [name, setMyName] = useState('')
    const [age, setMyAge] = useState('')
    const [pass, setMyPass] = useState('')
    const [email, setMyEmail] = useState('')
  function inputHandler(event){
    setMyName(event.target.value);
    setMyAge(event.target.value)
    setMyEmail(event.target.value)
    setMyPass(event.target.value)

  }

  async function sendDataHandler(event){
      event.preventDefault();

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
       console.log(data) ;
       setMyName('') ;
       setMyAge('')
       setMyEmail('')
       setMyPass('')

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
      console.log(loadedData);
     
  }
  )

  useEffect( () => {
    getDataHandler()
   }, [getDataHandler])


  return (
    <div className="App">
      
      <form onSubmit={sendDataHandler}>
        <input type="text"
               onChange={inputHandler}
               value={myData}
        />
        <button type="submit"> Prześlij dane do bazy </button>
      </form>
      <button onClick={getDataHandler}> Pobierz dane </button>
    </div>
  );
}

export default App;