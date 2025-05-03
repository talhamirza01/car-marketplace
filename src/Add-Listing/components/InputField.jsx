import { Input } from '@/Components/ui/input'
import React from 'react'

const InputField = ({item,handleInputChange,carInfo}) => {
  return (
    <div>
      <Input type={item?.fieldType}
            name={item?.name} 
            required={item?.required}
            defaultValue={carInfo?.[item.name]}
            onChange={(e) =>handleInputChange(item.name,e.target.value)}>
            </Input>
    </div>
  )
}

export default InputField
