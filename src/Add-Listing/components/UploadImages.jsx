import React, { useEffect } from 'react'
import { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { db } from '../../../configs'
import { CarImages } from '../../../configs/schema'
import axios from 'axios';
import { eq } from 'drizzle-orm';

const UploadImages = ({triggerUploadImages, carInfo, mode}) => {

    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [selectfileList, setSelectFileList] = useState([]);
    const [EditCarImageList, setEditCarImageList]= useState([])

    useEffect(()=>{
      if(mode=='edit')
        {
          setEditCarImageList([])
        carInfo?.images.forEach((image)=>{
          setEditCarImageList(prev=>[...prev,image?.imageUrl])
          console.log(image);
          
        })
      }
    },[carInfo])

    useEffect(()=>{
        if(triggerUploadImages){
            uploadImages();
        }
    },[triggerUploadImages]);


    const onFileSelect = (event) =>{
        const files=event.target.files;
         
        for(let i=0; i<files?.length; i++){
            const file = files[i];
            setSelectFileList((prev) => [...prev, file]);
        }  
    }
    const onImageRemove = (image, index) =>{
            const result = selectfileList.filter((item) => item != image);
            setSelectFileList(result);
    }

    const onImageRemoveFromDB = async(image, index)=>{
        const result = await db.delete(CarImages)
        .where(eq(CarImages.id, carInfo?.images[index]?.id)).returning({id:CarImages.id})
        const imageList=EditCarImageList.filter(item=>item!=image);
        setEditCarImageList(imageList)
    }


const uploadImages = async (carListingId) => {
  const uploadedUrls = [];

  for (const file of selectfileList) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Car-Marketplace'); 
    formData.append('cloud_name', 'dapoaxk1r');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dapoaxk1r/image/upload',
        formData
      );

      const downloadURL = res.data.secure_url;

      console.log('Uploaded Image URL:', downloadURL);
      await db.insert(CarImages).values({
        imageUrl: downloadURL,
        carListingid: triggerUploadImages,
      });

      uploadedUrls.push(downloadURL);

    } catch (error) {
      console.error('Error uploading or inserting image:', error);
    }
  }

  setUploadedImageUrls(uploadedUrls);
};


  return (
    <div>
        <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>

        {mode=='edit'&&
          EditCarImageList.map((image,index)=>(
            <div key={index}>
                <h2>
                    <IoIosCloseCircle className='absolute m-2 text-lg text-white cursor-pointer'
                    onClick={()=>onImageRemoveFromDB(image, index)}
                    />
                    </h2>
                <img src={image} className='w-full h-[130px] object-cover rounded-xl' />
            </div>
        ))}

        {selectfileList.map((image,index)=>(
            <div key={index}>
                <h2>
                    <IoIosCloseCircle className='absolute m-2 text-lg text-white cursor-pointer'
                    onClick={()=>onImageRemove(image, index)}
                    />
                    </h2>
                <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl' />
            </div>
        ))}

        <label htmlFor='upload-images'>
            <div className='border rounded-xl border-dotted border-blue-500 bg-blue-100 p-10 cursor-pointer hover:shadow-md'>
                <h2 className='text-lg text-center text-blue-500'>+</h2>
            </div>
        </label>
        <input type="file" multiple={true} id='upload-images' 
        onChange={onFileSelect}
        className='opacity-0'/>
      </div>
    </div>
  )
}

export default UploadImages
