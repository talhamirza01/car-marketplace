import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/Button';
import { CarImages, CarListing } from './../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/clerk-react';
import { db } from './../../../configs';
import CarLists from '@/Components/CarLists';
import { FaTrashAlt } from "react-icons/fa";
import Service from '@/Shared/Service';

const MyListings = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    user && getUserCarListings();
  }, [user]);

  const getUserCarListings = async () => {
    const result = await db.select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingid))
      .where(eq(CarListing.createdBy, user.primaryEmailAddress.emailAddress))
      .orderBy(desc(CarListing.id));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  const handleDeleteListing = async (listingId) => {
    try {
      // Delete images first
      await db.delete(CarImages).where(eq(CarImages.carListingid, listingId));

      // Then delete the listing itself
      await db.delete(CarListing).where(eq(CarListing.id, listingId));

      // Remove from UI
      const updatedList = carList.filter((car) => car.id !== listingId);
      setCarList(updatedList);

      console.log(`Deleted listing ${listingId}`);
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-4xl'>My Listings</h2>
        <Link to={'/add-listing'}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
        {carList.map((item, index) => (
          <div key={index}>
            <CarLists car={item} />
            <div className='p-2 bg-gray-50 rounded-lg flex justify-between gap-3'>
              <Link to={`/add-listing?mode=edit&id=${item.id}`} className='w-full'>
                <Button variant="outline" className='w-full'>Edit</Button>
              </Link>
              <Button
                variant="destructive"
                className="cursor-pointer "
                onClick={() => handleDeleteListing(item.id)}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
