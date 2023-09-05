import React, { useEffect, useState } from 'react';

const Todoreact = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedData, setStoredData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState(''); // Separate state for editing
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('todoData');
    if (savedData) {
      setStoredData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update main input field
  };

  const handleAddClick = () => {
    if (!isEditing && inputValue.trim() !== '') {
      const newData = [...storedData, inputValue];
      setStoredData(newData);
      setInputValue('');
      localStorage.setItem('todoData', JSON.stringify(newData));
    } else if (isEditing && editValue.trim() !== '') {
      finishEdit();
    }
  };

  const deleteItem = (index) => {
    const newDataAfterDelete = storedData.filter((item, i) => i !== index);
    setStoredData(newDataAfterDelete);
    localStorage.setItem('todoData', JSON.stringify(newDataAfterDelete));
    // Exit editing mode if the deleted item was being edited
    if (index === editIndex) {
      setEditIndex(-1);
      setIsEditing(false);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(storedData[index]); // Set the separate editValue state
    setIsEditing(true);
  };

  const finishEdit = () => {
    if (editValue.trim() !== '') {
      const updatedData = [...storedData];
      updatedData[editIndex] = editValue; // Use editValue for editing
      setStoredData(updatedData);
      localStorage.setItem('todoData', JSON.stringify(updatedData));
      setEditValue(''); // Clear editValue
      setEditIndex(-1);
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    // Clear editValue and exit editing mode
    setEditValue('');
    setEditIndex(-1);
    setIsEditing(false);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Item"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleAddClick}>
      Add Item
      </button>

      {storedData.map((item, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {isEditing && index === editIndex ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Edit item"
              />
              <button onClick={finishEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <p>{item}</p>
              <button onClick={() => startEdit(index)}>Edit</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Todoreact;
