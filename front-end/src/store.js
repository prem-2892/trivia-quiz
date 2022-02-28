import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    questionCreateReducer,
    setAnswerReducer,
    setCategoryReducer,
} from './reducers/questionReducers'

const reducer = combineReducers({
    questionCreate: questionCreateReducer,
    setCategory: setCategoryReducer,
    getAnswer: setAnswerReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
