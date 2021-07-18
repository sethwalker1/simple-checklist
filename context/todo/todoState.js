import React, { useReducer } from 'react'
import axios from 'axios'
import todoContext from './todoContext'
import todoReducer from './todoReducer'
import { GET_LIST, ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from  '../types'

const TodoState = (props) => {

    const initialState = {
        list: null
    }

    const [state, dispatch] = useReducer(todoReducer, initialState)

    // Get the user's list: 
    const getList = async id => {
        try {
            const res = await axios.get(`/api/todo/${id}`)

            dispatch({
                type: GET_LIST,
                payload: res.data
            })

        } catch (error) {
            console.warn(error.message)
        }
    }

    // Add an item to the list:
    const addItem = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/todo', formData, config)

            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })

        } catch (error) {
            console.warn(error.message)
        }
    }

    // Edit an item in the list:
    const editItem = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put('/api/todo', formData, config)

            dispatch({
                type: EDIT_ITEM,
                payload: formData
            })

        } catch (error) {
            console.warn(error.message)
        }
    }

    // Remove an item from the list:
    const deleteItem = async (id, user) => {
        try {
            const res = await axios.delete(`/api/todo/${id}/${user}`)
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })

        } catch (error) {
            console.warn(error.message)
        }
    }

    return (
        <todoContext.Provider value = {{
            list: state.list,
            getList,
            addItem,
            editItem,
            deleteItem
        }}>{props.children}</todoContext.Provider>
    )
}

export default TodoState
