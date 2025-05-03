import Header from '@/Components/Header'
import Search from '@/Components/Search'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import CarLists from '@/Components/CarLists'
import Service from '@/Shared/Service'

const SearchByCategory = () => {

    const {category} = useParams()
    const [carList, setCarList] = useState([])
    console.log(category);

    useEffect(()=>{
        GetCarList();
    },[category])

    const GetCarList = async() =>{
        const result = await db.select()
        .from(CarListing)
        .innerJoin(CarImages,eq(CarListing.id, CarImages.carListingid))
        .where(eq(CarListing.category, category))
        
        const resp=Service.FormatResult(result)
        
        console.log("DB Result:", result);
            setCarList(resp)        
    }
  
    return ( 
    <div>
      <Header/>

      <div className='p-10 bg-black flex justify-center'>
        <Search/>
      </div>
      <div className='p-10 md:px-20'>
        <h2 className='font-bold text-4xl '>{category}</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-7'>
             {carList?.length > 0 ? carList.map((item, index) => (
            <div key={index}>
                <CarLists car={item} />
            </div>
        )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='h-[320px] rounded-xl bg-slate-200 animate-pulse'>
            </div>
        ))
    }
        </div>
      </div>
    </div>
  )
}

export default SearchByCategory
