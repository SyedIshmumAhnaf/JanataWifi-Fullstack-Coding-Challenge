import React, {useState, useEffect} from 'react'; //useState and useEffect are hooks needed to hold state and re-render components based on circumstances
import axios from 'axios';

function App() {
  const [message, setMessage] = useState(""); //setting message to empty string initially
  console.log("Rendering App component");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/hello")
    .then(response => setMessage(response.data.message))
    .catch(error => console.error("Error fetching data", error)); //keeping catch in case of data retrieval erro
  }, []); //second parameter is left empty to run useEffect only once and render only once when started

  return <h1>{message}</h1>;
}

export default App;