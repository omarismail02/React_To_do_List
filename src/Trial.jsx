import React, { useState } from 'react';
import './Trial.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPen, faList } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPen, faList);

function MyComponent() {
  const [input1, setInput1] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');

  const handleTextChange = (event) => {
    setInput1(event.target.value);
  };

  const handleTextChange1 = (event) => {
    setEditedTask(event.target.value);
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditedTask(''); 
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditedTask(''); 
  };

  const Tasks = tasks.map((task, index) => (
    <ul key={index}>
      <li>
        {editIndex === index ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={handleTextChange1}
              autoFocus
            />
            <div className='buttons'>
              <button className='save' onClick={() => saveEdit(index)}>Save</button>
              <button className='cancel' onClick={cancelEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            {task}
            <div className='icons'>
              <FontAwesomeIcon icon="pen" className='icon' onClick={() => editTask(index)} />
              <FontAwesomeIcon icon="trash" className='icon' onClick={() => deleteById(index)} />
            </div>
          </>
        )}
      </li>
    </ul>
  ));

  function handleClick() {
    const newTask = input1.trim();
    if (newTask) {
      setTasks([...tasks, newTask]);
      setInput1("");
    }
  };

  const deleteById = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const editTask = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]); 
  };

  return (
    <section className='container'>
      <h1>To-Do-List</h1>
      <div className='add-task'>
        <input type='text' value={input1} onChange={handleTextChange} id='newtask' />
        <button onClick={handleClick}>Add</button>
      </div>
      <div className="tasks">
        {Tasks}
      </div>
    </section>
  );
}

export default MyComponent;
