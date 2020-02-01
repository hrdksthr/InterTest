import React from 'react';
import UsersComponent from "./Modules/Users"
import './App.css';
import UsersStore from "./Stores/users.store"

function App() {
  return (
    <div className="App">
      <UsersComponent users = {new UsersStore()}/>
    </div>
  );
}

export default App;
