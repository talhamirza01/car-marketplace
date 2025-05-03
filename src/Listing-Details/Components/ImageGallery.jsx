import React from 'react'

const ImageGallery = ({carDetail}) => {
    const imageUrl = carDetail?.images?.[0]?.imageUrl
  return (
    <div>
        <img src={imageUrl} className='w-full h-[400px] rounded-xl' />
    </div>
  )
}

export default ImageGallery