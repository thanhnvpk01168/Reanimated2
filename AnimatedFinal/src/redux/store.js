import { createStore } from 'redux'
import notesReducer from './reducer'

const store = createStore(notesReducer)

export default store