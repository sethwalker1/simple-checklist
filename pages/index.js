import React, { useEffect, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import todoContext from '../context/todo/todoContext'
import authContext from '../context/auth/authContext'
import TodoForm from "../components/todoForm.component"
import TodoItem from '../components/todoItem.component'
import { MDBContainer, MDBRow } from 'mdbreact'

const Todo = (props) => {

    const TodoContext = useContext(todoContext)
    const { list, getList } = TodoContext
    const AuthContext = useContext(authContext)
	const { logout } = AuthContext
    const token = localStorage.getItem('token')

    useEffect(() => {
        console.log(token)
        if(token === null){
            props.history.push('/login')
        }
        getList(token)
        // eslint-disable-next-line
    }, [props.history])

    const onLogout = () => {
		logout()
		window.location.href = "http://localhost:3000/login"
	}

    if (list === null) {
        return <h1>Loading</h1>
    }

    return (
        <div className="todo-container">
            <MDBRow style={{ display: "flex", justifyContent: "space-between", minHeight: "730px" }}>  
                <div className="col-xs-12 col-sm-10 col-md-6 col-lg-4" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div className="options">
                        <h3>Done ?</h3>
                        <button className="login-button transparent" onClick={onLogout}>Logout</button>
                    </div>
                    <TodoForm />
                    <div className="image-container">
                        <img className="custom-img" src="/notes.svg" layout="fill" alt="notes" />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-10 col-md-6 col-lg-6">
                    {list.length === 0 ?
                        <h2>Seems empty here, go ahead and add an item to your to-do list to get started!</h2> :
                        <div className="items">
                            {list.map(item => (
                                <CSSTransition key={item.id} classNames="item" timeout={500}>
                                    <TodoItem item={item} />
                                </CSSTransition>
                            ))}
                        </div>
                    }
                </div>
            </MDBRow>
        </div>
    )
}

export default Todo
