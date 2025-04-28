import Aside from '@/layout/Aside'
import React from 'react'
import TimerComponent from '@/components/Timer'

const Timer = () => {
  return (
    <div className='flex'>
        <Aside /> 
        <TimerComponent />
    </div>
  )
}

export default Timer