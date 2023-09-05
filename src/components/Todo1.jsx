import React, { useEffect, useState } from 'react';

const Todo1 = () => {
    const [inputData, setInputData] = useState('');
    const [storedData, setStoredData] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editItem, setEditItem] = useState('');

    useEffect(() => {
        const localStorageData = localStorage.getItem('todolist');
        if (localStorageData) {
            setStoredData(JSON.parse(localStorageData));
        }
    }, []);

    const handleChange = (e) => {
        setInputData(e.target.value);
    };

    const handleClick = () => {
        if (inputData.trim() !== '') {
            const newData = [...storedData, inputData];
            setStoredData(newData);
            localStorage.setItem('todolist', JSON.stringify(newData));
            setInputData('');
        }
    };

    const handleDelete = (index) => {
        setDeleteIndex(index);
    };

    const confirmDelete = () => {
        const updatedData = storedData.filter((item, i) => i !== deleteIndex);
        setStoredData(updatedData);
        localStorage.setItem('todolist', JSON.stringify(updatedData));
        setDeleteIndex(null);
    };

    const cancelDelete = () => {
        setDeleteIndex(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditItem(storedData[index]);
    };

    const confirmEdit = () => {
        if (editItem.trim() !== '') {
            const updatedData = [...storedData];
            updatedData[editIndex] = editItem;
            setStoredData(updatedData);
            localStorage.setItem('todolist', JSON.stringify(updatedData));
            setEditIndex(null);
            setEditItem('');
        }
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setEditItem('');
    };

    return (
        <>
            <input
                type="text"
                name=""
                id=""
                placeholder='Enter Item'
                value={inputData}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Add Item</button>
            {storedData.map((item, index) => (
                <div key={index} style={{ display: 'flex' }}>
                    {editIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editItem}
                                onChange={(e) => setEditItem(e.target.value)}
                            />
                            <button onClick={confirmEdit}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{item}</p>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                            <button onClick={() => handleEdit(index)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
            {deleteIndex !== null && (
                <div>
                    <h3>Are you sure you want to delete?</h3>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </>
    );
};

export default Todo1;
