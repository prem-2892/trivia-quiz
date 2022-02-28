import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { decode } from 'html-entities'
import Loader from './component/Loader'
import { nanoid } from 'nanoid'

// Actions
import {
    createQuestion,
    setAnswer,
    setCategory,
} from './action/questionActions.js'
import CorrectOption from './component/CorrectOption'
import IncorrectOption from './component/IncorrectOption'
import CustomSelectList from './component/CustomSelectList'

function App() {
    const [que, setQue] = useState('')
    const [opts, setOpts] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [correctAnswer, setCorrectAnswer] = useState()
    const [hasSelected, setHasSelected] = useState(false)
    const [clickable, setClickable] = useState(true)
    const [score, setScore] = useState(0)
    const [step, setStep] = useState(0)
    const [cat, setCat] = useState()

    const dispatch = useDispatch()

    const questionCreate = useSelector((state) => state.questionCreate)
    const { loading, error, question } = questionCreate

    // console.log(answer)

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            // And swap it with the current element.
            ;[array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ]
        }

        setOpts(array)
    }

    useEffect(() => {
        if (question !== undefined) {
            setQue(question.results[0].question)

            // ----------------------
            const newArr = question.results[0].incorrect_answers
            newArr.push(question.results[0].correct_answer)
            shuffle(newArr)
        }
    }, [question, dispatch])

    // Functions for handling

    function clickHandle(option) {
        if (clickable) {
            setClickable(false)
            // dispatch(setAnswer(option))
            setSelectedAnswer(option)
            setHasSelected(true)
            setCorrectAnswer(question.results[0].correct_answer)
        }
    }

    function submitHandler(e) {
        e.preventDefault()
        if (correctAnswer === selectedAnswer) {
            setScore(score + 1)
        } else {
            setScore(score - 1)
        }
        setClickable(true)
        setSelectedAnswer(undefined)
        setHasSelected(false)
        setCorrectAnswer(undefined)
        dispatch(createQuestion())
    }

    // Setting category

    const nextClickListener = (event) => {
        event.preventDefault()

        dispatch(setCategory(cat))
        dispatch(createQuestion())
        setStep(1)
    }
    if (loading) {
        return <Loader />
    } else {
        return (
            <div className='App'>
                <h1 className='heading'>Gain a little Something!</h1>

                <div className='container'>
                    <div className='content'>
                        {step === 0 ? (
                            <>
                                <div className='first-step-div'>
                                    <form
                                        action='#'
                                        className='set-category-form'
                                        onSubmit={(e) => nextClickListener(e)}
                                    >
                                        <CustomSelectList
                                            setCat={setCat}
                                            className='list'
                                        />
                                        <button
                                            className='btn-next-step'
                                            type='submit'
                                        >
                                            NEXT
                                        </button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='que'>{decode(que)}</div>
                                <div className='options'>
                                    {opts.map((option) =>
                                        hasSelected === false ? (
                                            <div
                                                className='option'
                                                key={nanoid()}
                                                onClick={(e) => {
                                                    clickHandle(option)
                                                }}
                                            >
                                                <div className='option-text'>
                                                    {option}
                                                </div>
                                            </div>
                                        ) : selectedAnswer === option ? (
                                            selectedAnswer === correctAnswer ? (
                                                <CorrectOption
                                                    data={selectedAnswer}
                                                    key={nanoid()}
                                                />
                                            ) : (
                                                <IncorrectOption
                                                    data={selectedAnswer}
                                                    key={nanoid()}
                                                />
                                            )
                                        ) : option === correctAnswer ? (
                                            <CorrectOption
                                                data={option}
                                                key={nanoid()}
                                            />
                                        ) : (
                                            <div
                                                className='option'
                                                key={nanoid()}
                                                onClick={(e) => {
                                                    clickHandle(option)
                                                }}
                                            >
                                                <div className='option-text'>
                                                    {option}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                        <div
                            className={`cta ${
                                hasSelected === false ? 'cta-dis-none' : ''
                            }`}
                        >
                            <button
                                className='sub-btn'
                                disabled={hasSelected === false ? true : false}
                                onClick={(e) => submitHandler(e)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
