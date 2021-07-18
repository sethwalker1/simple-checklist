import React, { useState, useContext } from 'react'
import todoContext from "../context/todo/todoContext"

const TodoForm = () => {

    const TodoContext = useContext(todoContext)

    const token = localStorage.getItem('token')
    const { addItem } = TodoContext 
 
    const [ item, setItem ] = useState({
        id: '',
        name: '',
        description: '',
        email: ''        
    })

    const { id, name, description } = item

    const onChange = e => {
        setItem({...item, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        addItem ({
            id,
            name,
            description,
            email:  Buffer.from(token, 'base64').toString()
        })
        setItem({
            id: '',
            name: '',
            description: '',
            email: ''
        })
    }

    return (
        <div className="forms-container">
            <form onSubmit={onSubmit} className="todo-form">
                <h2 className="title">Item</h2>
                <div className="input-field">
                    <i className="fas fa-cog prefix grey-text"></i>
                    <input placeholder="Name" type="text" name="name" onChange={onChange} value={name} required />
                </div>
                <div className="input-field">
                    <i className="fas fa-pencil-alt prefix grey-text"></i>
                    <textarea placeholder="Description" rows="4" cols="50" name="description" onChange={onChange} value={description} required />
                </div>
                <button type="submit" className="login-button">Add Item</button>
            </form>
        </div>
    )
}


export default TodoForm