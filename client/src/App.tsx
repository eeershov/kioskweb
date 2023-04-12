import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Calendar from './components/Calendar';


function App() {

  return (
    <div className="App">
      <Header />
      <Calendar />
      <Footer />
    </div>
  )
}

export default App
