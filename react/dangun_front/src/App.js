import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ItemListComponent from './Components/ItemLIstComponent';
import ItemDetailComponent from './Components/ItemDetailComponent';
import ChatRoomComponent from './Components/ChatRoomComponent.js';
import DealCompleteComponent from './Components/DealCompleteComponent.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/item/list" element={<ItemListComponent/>}></Route>
          <Route path='/item/detail/:item_id' element={<ItemDetailComponent/>}></Route>
          <Route path='/chatroom/:roomId/:sender/:itemId' element={<ChatRoomComponent/>}></Route>
          <Route path='/item/complete/:itemId' element={<DealCompleteComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;