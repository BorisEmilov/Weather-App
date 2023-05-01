import React from 'react'

const GlassEfect = ({content}) => {
  return (
    <div className='w-[85%] max-w-[500px] flex flex-col items-center justify-start backdrop-blur-md bg-white/30 rounded-[25px] text-center'>
        {content}
    </div>
  )
}

export default GlassEfect