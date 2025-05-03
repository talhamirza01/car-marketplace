import FakeData from '@/Shared/FakeData';
import { db } from './../../configs';
import { CarListing, CarImages } from './../../configs/schema';
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CarLists from './CarLists';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MostSearchedCar = () => {

  const [carList, setCarList] = useState([]);
  useEffect(()=>{
    GetPopularCarList();
  },[])

    const GetPopularCarList=async()=>{
       // Fetch listings created by user
       const listings = await db.select()
         .from(CarListing)
         .orderBy(desc(CarListing.id))
         .limit(10)
         .execute(); // ✅ Important!
     
       console.log("Fetched Listings:", listings);
     
       // Fetch images for each listing
       const listingsWithImages = await Promise.all(
         listings.map(async (listing) => {
           const images = await db.select()
             .from(CarImages)
             .where(eq(CarImages.carListingid, listing.id))
             .execute(); // ✅ Important!
     
           return {
             ...listing,
             images: images
           };
         })
       );
     
       console.log("Listings with Images:", listingsWithImages);
     
       setCarList(listingsWithImages);
      
    }

  return (
    <div className='mx-24 '>
     <h2 className='font-bold text-3xl text-center my-16 mt-16 mb-6'>Most Searched Cars</h2>

                <Carousel>
            <CarouselContent>
                {carList.map((car,index)=>(
                    <CarouselItem className="basis-1/4 ">
            <CarLists car={car} key={index} />
            </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>

    </div>
  )
}

export default MostSearchedCar
