import IconField from '@/Add-Listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

const Specification = ({carDetail}) => {
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>

        <h2 className='font-medium text-3xl'>Specifications</h2>

        {carDetail? CarSpecification.map((item,index)=>(
            <div className='mt-5 flex items-center justify-between'>
                <h2 className='flex gap-2 font-medium'><IconField  icon={item?.icon}/>  {item.label}</h2>
                <h2>{carDetail[item?.name]}</h2>
              
            </div>
        ))
        :
        <div className='w-full h-[500px] rounded-xl bg-slate-200 animate-pulse mt-7'>
                
        </div>

    }
    </div>
  )
}

export default Specification
