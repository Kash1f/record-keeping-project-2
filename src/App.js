import React, { useState, useEffect } from "react";
import "./App.css";
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete } from 'react-icons/md';
import  {BsCheck2 } from'react-icons/bs';

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const App = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //items function
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems( items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata }; }
          return curElem;
        }));

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }};

  //function to edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  //remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  //adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items)); }, [items]);

      return (
      <>
      <div className="main-div">
        <div className="child-div">

        <figcaption>To-do List </figcaption>
       
          <div className="addItems">
            <input type="text" placeholder=" Add Item" className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}/>
            {toggleButton ? (
              <BsCheck2 className="far fa-edit add-btn" onClick={addItem}></BsCheck2>
            ) : (
              <BsCheck2 className="fa fa-plus add-btn" onClick={addItem}></BsCheck2>
            )}
          </div>

          <div className="showItems">

            {items.map((curElem) => {

              return (

          <div className="eachItem" key={curElem.id}>

           <h3>{curElem.name}</h3>

          <div className="todo-btn">

            <CiEdit className="far fa-edit add-btn" onClick={() => editItem(curElem.id)} ></CiEdit>

            <MdOutlineDelete className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></MdOutlineDelete>

          </div>
          </div> ); })}
          </div>
          </div>
          </div>
    </>
  );
};

export default App;
