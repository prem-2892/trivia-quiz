import React from 'react'

const CorrectOption = ({ data }) => {
    return (
        <div className='option correct-option'>
            <div className='content'>
                <div className='option-data'>{data}</div>
                <span className='material-icons validation-icon'>
                    check_circle
                </span>
            </div>
        </div>
    )
}

export default CorrectOption
