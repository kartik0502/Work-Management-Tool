import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 bg-black opacity-70 flex items-center justify-center z-999'>
      <div className="h-10 w-10 border-2 border-gray-200 border-solid border-t-transparent rounded-full animate-spin border-4">

      </div>
    </div>
  )
}

export default Spinner