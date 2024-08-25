import React from 'react'

function Loading() {
    return (
        <div className='w-screen h-screen flex items-center justify-center absolute bg-black top-0 left-0 bg-opacity-20 '>
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
    )
}

export default Loading