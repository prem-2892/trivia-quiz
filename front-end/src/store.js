import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    questionCreateReducer,
    setAnswerReducer,
} from './reducers/questionReducers'

const reducer = combineReducers({
    questionCreate: questionCreateReducer,
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
