import React from 'react';
import './App.css';
import Routes from "./routes";

function App() {
    return <Routes/>; // Colocar apenas isso no App.tsx
}

export default App;

// Exemplo 01
//import React, {useState} from 'react';
//import Header from "./Header";

/*
// Exemplo 01
// Stage
const [counter, setCounter] = useState(0); // Retorna um array, [valor, função para atualizar]

function handleButtonClick() {
    // Atualiza o counter, utilizando a imutabilidade, atribuindo um novo valor
    setCounter(counter + 1);
}

return (
    <div>
        <Header title={`Hello World! ${counter}`}/>
        <h1>{counter}</h1>
        <button type="button" onClick={handleButtonClick}>Aumentar</button>
    </div>
);
*/
