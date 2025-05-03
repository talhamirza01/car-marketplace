import React from 'react'

const Description = ({carDetail}) => {
  return (
    <>
    {carDetail?.listingDescription?<div>
    <div className='p-5 rounded-xl bg-white shadow-md border'>
        <h2 className='my-2 font-medium text-2xl'>Description</h2>
      <p>{carDetail?.listingDescription}</p>
    </div>
    </div>
    :
    <div className='w-full h-[100px] mt-7 bg-slate-200 animate-pulse rounded-xl'>

    </div>
}
    </>
  )
}

export default Description
