import { GET_LIST, ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from  '../types'

const TodoReducer = (state, action) => {
    switch (action.type) {

        case GET_LIST:
            return {
                ...state,
                list: action.payload
            }

        case ADD_ITEM:
            return {
                ...state,
                list: [action.payload, ...state.list]
            }

        case EDIT_ITEM:
            return {
                ...state,
                list: state.list.map(item => item.id === action.payload.id ? action.payload : item)
            }

        case DELETE_ITEM:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload)
            }

        default: return state
    }
}

export default TodoReducer
