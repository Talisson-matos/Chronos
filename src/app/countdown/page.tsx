import Aside from '@/layout/Aside'
import React from 'react'
import CountDownComponent from '@/components/CountDown'

const CountDown = () => {
  return (
    <div className='flex'>
        <Aside /> 
        <CountDownComponent />        
    </div>
  )
}

export default CountDown