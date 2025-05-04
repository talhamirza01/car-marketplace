import React from 'react'
import Header from '../Components/Header'
import MyListings from './components/MyListings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import Inbox from './components/Inbox'


const Profile = () => {
  return (
    <div>
      <Header></Header>
      <div className='px-10 md:px-20 my-10'>
        <Tabs defaultValue="my-listing" className="w-full">
        <TabsList className="w-full flex justify-start">
          <TabsTrigger value="my-listing">My Listing</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>

        </TabsList>
        <TabsContent value="my-listing" className="mb-6"> 
          <MyListings/>
        </TabsContent>

        <TabsContent value="inbox"><Inbox/></TabsContent>
       <TabsContent value="profile">Profile Tab</TabsContent>


      </Tabs>

      </div>
    </div>
  )
}

export default Profile
