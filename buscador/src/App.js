import React, { Component }  from 'react';
import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import './style.css';
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handle(){
    //01310930/json

    if(input === ""){
      alert("Preencha os campos");
    
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }catch{
      alert('Error')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className='tittle'>Buscador de Local</h1>

      <div className='containerInput'>
        <input type='text' placeholder='Digite seu cep...' value={input} onChange={(e) => setInput(e.target.value)}></input>

      <button className='buttonSearch' onClick={handle}><FiSearch size={25} color='#fff'/></button>

      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Complemento: {cep.logradouro}</span>
        <span> {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade}</span>
      </main>
      )}
 
    </div>
  );
}

export default App;
