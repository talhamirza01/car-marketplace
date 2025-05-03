import React, { useEffect } from 'react'
import Header from '../Components/Header'
import carDetails from '../Shared/carDetails.json'
import InputField from './components/InputField'
import DropDownField from './components/DropDownField'
import { Textarea } from '@/Components/ui/textarea'
import { Separator } from '@/Components/ui/separator'
import features from '../Shared/features.json'
import { Checkbox } from '@/Components/ui/checkbox'
import { Button } from '@/Components/ui/button'
import { useState } from 'react'
import { CarImages, CarListing } from './../../configs/schema'
import {db} from './../../configs'
import TextAreaField from './components/TextAreaField'
import UploadImages from './components/UploadImages'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import { useNavigate } from 'react-router-dom'
import Service from '@/Shared/Service'


const AddListing = () => {


  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [carInfo, setCarInfo] = useState()
  const [searchParams] = useSearchParams();

  const {user} = useUser()

const navigate = useNavigate();

  const mode = searchParams.get('mode')
  const recordId=searchParams.get('id')

  useEffect(()=>{
    if(mode=='edit'){
      GetListingDetail();
    }
  },[])

  const GetListingDetail = async()=>{
    const result= await db.select()
    .from(CarListing)
    .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingid))
    .where(eq(CarListing.id, recordId))

    const resp = Service.FormatResult(result)

    setCarInfo(resp[0])
    setFormData(resp[0])
    setFeaturesData(resp[0].features)
    
  }

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
    
  }

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(featuresData);
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    if(mode=='edit'){
      const result = await db.update(CarListing).set({
          ...formData,
      features: featuresData,
      createdBy: user?.primaryEmailAddress.emailAddress,
      postedOn: moment().format('DD/MM/YYYY')
      }).where(eq(CarListing.id, recordId)).returning({id:CarListing.id});
      console.log(result);
      navigate('/Profile')
    }
    else{

    try{
    const result =await db.insert(CarListing).values({
      ...formData,
      features: featuresData,
      createdBy: user?.primaryEmailAddress.emailAddress,
      userName:user?.fullName,
      userImageUrl:user?.imageUrl,
      postedOn: moment().format('DD/MM/YYYY')

    }).returning({id:CarListing.id})
     if(result){
      console.log("Data Saved")
      setTriggerUploadImages(result[0]?.id)
      
     }
  }catch(e){
    console.log("error",e);
  }
  }
      }

  return (
    <div>
      <Header></Header>
      <div className='px-10 md:px-20 my-10'>
        <h2 className='font-bold text-4xl'>Add New Listing</h2>
        <form className='p-10 border rounded-xl mt-10 shadow-md'>
            <div>
                <h2 className='font-medium text-xl mb-6'>Car details</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {carDetails.carDetails.map((item, index) => (
                        <div key={index}>
                            <label className='text-sm'>
                              {/* <IconField icon={item?.icon}/> */}
                              {item?.label} {item.required&&<span className='text-red-500'>*</span>} </label>
                            {item.fieldType=='text'||item.fieldType=='number'
                            ?<InputField item={item} 
                            handleInputChange={handleInputChange} carInfo={carInfo}/>
                            :item.fieldType=='dropdown'
                            ?<DropDownField item={item} 
                            handleInputChange={handleInputChange} carInfo={carInfo}/>
                            :item.fieldType=='textarea'
                            ?<TextAreaField item={item}
                            handleInputChange={handleInputChange} carInfo={carInfo}/>
                            :null}
                        </div>
                        ))}
                </div>
            </div>
            <Separator className="my-6"/>
            <div>
              <h2 className='font-medium text-xl my-6'>Features</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                {features.features.map((item, index) => (
                  <div key={index} className='flex gap-2 items-center'>
                      <Checkbox onCheckedChange={(value)=>handleFeatureChange(item.name,value)}
                        checked={featuresData?.[item.name]}
                        /> 
                        <h2>{item.label}</h2>
                  </div>
                ))}
              </div>
            </div>
            <UploadImages triggerUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            ></UploadImages>
            <Separator className="my-6"/>
            <div className='mt-10 flex justify-end'>
              <Button type='submit' onClick={(e)=>onSubmit(e)}>Submit</Button>
            </div>
        </form>

      </div>
    </div>
  )
}

export default AddListing
