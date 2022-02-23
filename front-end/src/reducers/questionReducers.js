import {
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_REQUEST,
    QUESTION_CREATE_FAIL,
    SET_ANSWER_REQUEST,
    SET_ANSWER_SUCCESS,
    SET_ANSWER_FAIL,
} from '../constants/questionConstants'

export const questionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case QUESTION_CREATE_REQUEST:
            return { loading: true }

        case QUESTION_CREATE_SUCCESS:
            return { loading: false, success: true, question: action.payload }

        case QUESTION_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const setAnswerReducer = (state = { answer: false }, action) => {
    switch (action.type) {
        case SET_ANSWER_REQUEST:
            return { loading: true }

        case SET_ANSWER_SUCCESS:
            return { loading: false, answer: action.payload }

        case SET_ANSWER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
