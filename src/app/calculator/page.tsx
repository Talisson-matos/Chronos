import CalculatorComponent from '@/components/Calculator'
import Aside from '@/layout/Aside'
import React from 'react'

const Calculator = () => {
  return (
    <div className='flex'>

        <Aside />
        <CalculatorComponent />
        
    </div>
  )
}

export default Calculator