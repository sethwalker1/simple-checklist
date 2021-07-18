import React, { useContext, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBIcon, MDBCardTitle } from 'mdbreact'
import Flippy, { FrontSide, BackSide } from 'react-flippy'
import todoContext from "../context/todo/todoContext"

const TodoItem = ({ item }) => {

    const TodoContext = useContext(todoContext)
    const { deleteItem, editItem } = TodoContext
    const { id, name, description, email } = item

    const onDelete = () => {
        deleteItem(id, email)
    }

    const [state, setState] = useState({
		flipped: false,
	})

	const handleFlipping = () => {
        setState({ flipped: !state.flipped })
        setItem({
            item_name: name,
            item_description: description
        })
	}
        
    const [ listItem, setItem ] = useState({
        item_name: name,
        item_description: description        
    })

    const { item_name, item_description } = listItem

    const onChange = e => {
        setItem({...listItem, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        editItem({
            id,
            name: item_name,
            description: item_description,
            email
        })
        handleFlipping()
    }

    const modalText = 
        <form onSubmit={onSubmit}>
            <div className="grey-text">
                <div className="md-form">
                    <i className="fas fa-cog prefix grey-text"></i>
                    <input placeholder="Name" type="text" name="item_name" onChange={onChange} value={item_name} id="materialFormCardEmailEx" className="form-control" required />
                </div>
                <div className="md-form">
                    <i className="fas fa-pencil-alt prefix grey-text"></i>
                    <textarea placeholder="Description" rows="4" cols="50" name="item_description" onChange={onChange} value={item_description} className="form-control md-textarea" required />
                </div>
            </div>
            <span className="text-success" onClick={onSubmit} style={{ cursor: "pointer", position: "absolute", bottom: "0.75rem", left: "0.5rem" }}>
                <MDBIcon icon="check" />{" "}Edit
            </span>
            <span className="text-danger" onClick={handleFlipping} style={{ cursor: "pointer", position: "absolute", bottom: "0.75rem", right: "0.5rem" }}>
                <MDBIcon icon="times" />{" "}Cancel
            </span>
        </form>

    return (
        <Flippy flipDirection="horizontal" isFlipped={state.flipped} style={{ height: "100%" }}>
            <FrontSide style={{ backgroundColor: "#efefef" }}>
                <MDBCard style={{ height: "320px" }}> 
                    <MDBCardHeader color="elegant-color-dark" tag="h3">{name}</MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardTitle>Action to be done</MDBCardTitle>
                        <MDBCardText>
                            {description}
                        </MDBCardText>
                        <span className="text-primary" onClick={onDelete} style={{ cursor: "pointer", position: "absolute", bottom: "0.75rem", left: "0.5rem" }}>
                        <MDBIcon icon="check" /> Finish
                        </span>
                        <span className="text-secondary" onClick={handleFlipping} style={{ cursor: "pointer", position: "absolute", bottom: "0.75rem", right: "0.5rem" }}>
                            Edit <MDBIcon icon="angle-double-right" /> 
                        </span>
                    </MDBCardBody>
                </MDBCard>
            </FrontSide>
            <BackSide style={{ backgroundColor: "#efefef" }}> 
                <MDBCard>
                    <MDBCardBody>
                        <h6>Edit values for <span className="text text-secondary">{name}</span></h6> <hr/>
                        <MDBCardText className="text-grey">
                            {modalText}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </BackSide>
        </Flippy>
    )
}

export default TodoItem
