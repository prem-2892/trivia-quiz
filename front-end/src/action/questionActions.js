import axios from 'axios'
import {
    QUESTION_CREATE_REQUEST,
    QUESTION_CREATE_SUCCESS,
    QUESTION_CREATE_FAIL,
    SET_ANSWER_REQUEST,
    SET_ANSWER_SUCCESS,
    SET_ANSWER_FAIL,
    SET_CATEGORY_REQUEST,
    SET_CATEGORY_SUCCESS,
    SET_CATEGORY_FAIL,
} from '../constants/questionConstants'

export const createQuestion = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: QUESTION_CREATE_REQUEST,
        })

        const {
            setCategory: { category },
        } = getState()

        console.log(category)

        const { data } = await axios.get('https://opentdb.com/api.php', {
            params: {
                amount: 1,
                category: category,
                type: 'multiple',
            },
        })

        dispatch({
            type: QUESTION_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: QUESTION_CREATE_FAIL,
            payload: message,
        })
    }
}

export const setCategory = (cat) => async (dispatch) => {
    try {
        dispatch({
            type: SET_CATEGORY_REQUEST,
        })

        if (cat !== 0) {
            dispatch({
                type: SET_CATEGORY_SUCCESS,
                payload: cat,
            })
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: SET_CATEGORY_FAIL,
            payload: message,
        })
    }
}

export const setAnswer = (ans) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SET_ANSWER_REQUEST,
        })

        const {
            questionCreate: {
                question: { results },
            },
        } = getState()

        if (ans === results[0].correct_answer) {
            dispatch({
                type: SET_ANSWER_SUCCESS,
                payload: true,
            })
        } else {
            dispatch({
                type: SET_ANSWER_SUCCESS,
                payload: false,
            })
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: SET_ANSWER_FAIL,
            payload: message,
        })
    }
}
