import MeasureConverterComponent from '@/components/MeasureConverterComponent'
import Aside from '@/layout/Aside'
import React from 'react'

const MeasureConverter = () => {
  return (
    <div className='flex '>
        <Aside /> 
       <MeasureConverterComponent />
    </div>
  )
}

export default MeasureConverter