import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";


const TodoApp = ({ }) => {
  let [items, setItems] = useState([
    { id: 1, label: "Html&css", checked: true },
    { id: 2, label: "java&css", checked: true },
    { id: 3, label: "python&css", checked: false },
  ]);
let [newItem,setnewItem] = useState("")
let [isediting,setisedit]= useState(false)
let [currentEleID,setcurrentEleID] = useState(null)



let handleChecked = ( id)=> {
let newlistitem = items.map( (item)=>{ 
  return item.id === id ? 
  {...item,checked : !item.checked} : item})
setItems(newlistitem)
}

let handleUpdate = (id) => {
  let listItem = items.find(item => item,id ===id)
  setnewItem(listItem.label)
  setisedit(true)
  setcurrentEleID(id)
}

let handleDelete = (id) => {
 let newItem = items.filter((item) => item.id !==id).map((item,index)=>{
  return {...item,id:index+1};
 })
 setItems(newItem)
 setcurrentEleID(null)
 setnewItem("")
 setisedit(false)
}

let handleAddorSaveItem = () => {
  if(isediting){
     let newisItems = items.map ( (item)=> {
      return item.id === currentEleID ? {...item, label : newItem} : item
     }) 

     setItems(newisItems)
  }
  else{
    setItems([...items,{id:items.length+1,label: newItem,checked:false}])
    setnewItem("")
    
  }

}

  
return (
    <main>
      
 
      <div>
        <input type="text" value={newItem}
        placeholder="add new item"
        onChange={(e)=>{setnewItem(e.target.value)}}>

        </input>
        <button onClick={handleAddorSaveItem}>{isediting ? <CiSaveDown2 color="green"/> 
         : <IoIosAddCircle color="blue"/>}</button>

      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input type="checkbox" checked={item.checked} onChange={() => handleChecked(item.id)} />
              <label>{item.label}</label>
              <FaEdit id = 'edit'role="button" tabIndex={0} onClick={ ()=> handleUpdate(item.id)}/>
              <FaTrashAlt id='delete' role="button" tabIndex={0} onClick={()=>handleDelete (item.id)}/>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default TodoApp;
