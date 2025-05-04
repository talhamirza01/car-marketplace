import { Button } from '@/Components/ui/Button'
import React from 'react'
import { MdOutlineLocalOffer } from "react-icons/md";


const Pricing = ({carDetail}) => {
  return (
    <div className='p-10 rounded-xl shadow-md'>
      <h2 className='text-xl'>Price</h2>
      <h2 className='font-bold text-4xl'>${carDetail.sellingPrice}</h2>

      <Button className="w-full mt-7 bg-blue-500" size="lg">
        <MdOutlineLocalOffer />
        Make an Offer Price
        </Button>
    </div>
  )
}

export default Pricing
