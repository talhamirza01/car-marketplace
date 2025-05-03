import React from 'react';
import { FaCheck } from "react-icons/fa";


const Features = ({ features }) => {

  if (!features || typeof features !== 'object') {
    return <p className="text-gray-500">No features available.</p>;
  }

  console.log(features);
  

  return (
    <div className='p-5 border shadow-md rounded-xl my-7'>
        <h2 className='font-medium text-2xl'>Features</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
      {Object.entries(features).map(([key, value]) => (
        <div key={key} className="flex gap-2 items-center">
            <FaCheck className='text-lg p-1 rounded-full bg-blue-100 text-blue-500'/>
         <h2>{key}</h2>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Features;
