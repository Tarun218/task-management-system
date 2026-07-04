import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <div style={{color:'red'}}>
        <p>{message}</p>
    </div>
  )
}

export default ErrorMessage