import React from 'react'

const IncorrectOption = ({ data }) => {
    return (
        <div className='option incorrect-option'>
            <div className='content'>
                <div className='option-data'>{data}</div>
                <span className='material-icons validation-icon'>cancel</span>
            </div>
        </div>
    )
}

export default IncorrectOption
