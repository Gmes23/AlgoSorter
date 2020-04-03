import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodosApp from './components/todo';

//  Stylesheets 
import './css/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <TodosApp />
    </div>
  );
}

export default App;
