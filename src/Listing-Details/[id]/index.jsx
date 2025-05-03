import Header from '@/Components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from '../Components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import ImageGallery from '../Components/ImageGallery'
import Description from '../Components/Description'
import Features from '../Components/Features'
import Pricing from '../Components/Pricing'
import Specification from '../Components/Specification'
import OwnerDetail from '../Components/OwnerDetail'
import FinancialCalc from '../Components/FinancialCalc'
import Footer from '@/Components/Footer'
import MostSearchedCar from '@/Components/MostSearchedCar'

const ListingDetail = () => {

        const {id} = useParams()
        console.log(id);

        const [carDetail, setCarDetail] =useState([])

        useEffect(()=>{
            GetCarDetails()
        },[])
        
        const GetCarDetails = async()=>{
            const result = await db.select()
            .from(CarListing)
            .innerJoin(CarImages,eq(CarListing.id, CarImages.carListingid))
            .where(eq(CarListing.id,id));

            const resp = Service.FormatResult(result);
            setCarDetail(resp[0])            
        }

  return (
    <div>
      <Header/>

      <div className='p-10 md:px-20'>
        <DetailHeader carDetail={carDetail} />
        <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-6'>
            <div className='md:col-span-2'>
                <ImageGallery carDetail={carDetail}/>
                <Description carDetail={carDetail}/>
                <Features features={carDetail?.features}/>
                <FinancialCalc carDetail={carDetail}/>
            </div>

            <div className=''>
                <Pricing carDetail={carDetail}/>
                <Specification carDetail={carDetail}/>
                <OwnerDetail carDetail={carDetail}/>
            </div>
        </div>
        <MostSearchedCar/>
      </div>
      <Footer/>
    </div>
  )
}

export default ListingDetail
