import React from 'react'

const InfoSection = () => {
return (
 <section>
    <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pt-14 pb-14'>
            <div className='grid grid-cols-1 lg:h-[80vh] lg:grid-cols-2'>
                    <div className='relative z-10 lg:py-16'>
                            <div className='relative h-64 sm:h-80 lg:h-full lg:w-[105%]'>
                                    <img 
                                    src="https://static1.squarespace.com/static/5f886b8b92e5ff15710df969/t/65322bf8acfe264c1fecb7b9/1697786873003/mercedes-amg-gt-2023.jpg?format=1500w"
                                    className='absolute inset-0 h-full w-full object-cover'
                                    />
                            </div>
                    </div>

                    <div className='relative flex items-center bg-gray-100'>
                            <span className='hidden lg:absolute lg:inset-y-0 lg:start-16'></span>

                            <div className='p-8 sm:p-16 lg:p-24'>
                                    <h2 className='text-3xl font-bold sm:text-3xl'>
                                            WHEELZAR
                                    </h2>

                                    <p className='mt-4 text-grey-600'>
                                          At Wheelzar, we connect car buyers and sellers across the country with a simple, secure, and smart marketplace. Whether you're looking to buy your next ride or sell your current vehicle, Wheelzar provides a seamless experience with verified listings, high-quality images, and all the details you need to make informed decisions. Our mission is to make car trading easier, faster, and more trustworthy for everyone.
                                    </p>
                                    <a href="#" className='mt-8 inline-block rounded border bg-blue-500 text-white'>
                                            Get in Touch
                                    </a>
                            </div>
                    </div>
            </div>
    </div>
 </section>
)
}

export default InfoSection
