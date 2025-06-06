import { Separator } from '@radix-ui/react-select'
import { LuFuel } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOutlineOpenInNew } from "react-icons/md";
import React from 'react'
import { Link } from 'react-router-dom';



const CarLists = ({car}) => {
        
return (
                <Link to={'/Listing-Details/'+car?.id}>
                        <div className='rounded-xl bg-white border over:shadow-md cursor-pointer'>
                                <h2 className='absolute m-2 bg-green-500 px-2 rounded-full text-sm pb-1 text-white'>New</h2>
                                <img src={car?.images?.length > 0 ? car.images[0]?.imageUrl : '/default-car.jpg'} 
                        width='100%' height={250} className='rounded-t-xl h-[180px] object-cover'/>
                                <div className='p-4'>
                                <h2 className='font-bold text-black text-lg mb-2'>{car?.listingTitle}</h2>
                                <Separator></Separator>
                                <div className='grid grid-cols-3 mt-5'>
                                        <div className='flex flex-col items-center shadow-[0_-4px_4px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1)] p-2'>
                                                <LuFuel className='text-lg mb-2'/>
                                                <h2>{car?.mileage} Miles</h2>
                                        </div>
                                        <div className='flex flex-col items-center shadow-[0_-4px_4px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1)] p-2'>
                                                <IoMdSpeedometer className='text-lg mb-2'/>
                                                <h2>{car?.fuelType}</h2>
                                        </div>
                                        <div className='flex flex-col items-center shadow-[0_-4px_4px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.1)] p-2'>
                                                <GiGearStickPattern className='text-lg mb-2'/>
                                                <h2>{car?.transmission}</h2>
                                        </div>
                                </div>
                                <Separator className='my-2'/>
                                <div className='flex items-center justify-between'>
                                        <h2 className='font-bold text-xl'>${car.sellingPrice}</h2>
                                        <h2 className='text-blue-400 text-sm flex gap-2 items-center'>
                                                View Details
                                                <MdOutlineOpenInNew />
                                                </h2>
                                </div>
                                </div>
                        </div>
                </Link>
)
}

export default CarLists
