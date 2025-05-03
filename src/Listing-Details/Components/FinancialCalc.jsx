import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import React, { useState } from 'react'

const FinancialCalc = ({carDetail}) => {

    const [carPrice, setCarPrice] = useState(0)
    const [interestRate, setIntersetRate] = useState(0)
    const [loanTenure, setLoanTenure] = useState(0)
    const [downPayment, setDownPayment] = useState(0)
    const [monthlyPayment, setMonthlyPayment] = useState(0)

    const CalculateMonthlyPayment = ()=>{
        console.log(carPrice,interestRate,loanTenure,downPayment);
        
        const Principle = carPrice-downPayment;
        const MonthlyInterestRate = interestRate/1200;

        const MonthlyPayment = (Principle*MonthlyInterestRate*Math.pow(1+MonthlyInterestRate, loanTenure))/
        (Math.pow(1+MonthlyInterestRate, loanTenure)-1)

        setMonthlyPayment(MonthlyPayment.toFixed(2));
        
    }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl'>Financial Calculator</h2>
        <div className='flex gap-2 mt-5'>

            <div className='w-full'>
                <label>Price</label>
                <Input type="number" onChange={(e)=>setCarPrice(e.target.value)}/>
            </div>
             <div className='w-full'>
                <label>Interest Rate %</label>
                <Input type="number" onChange={(e)=>setIntersetRate(e.target.value)}/>
            </div>
        </div>

        <div className='flex gap-2 mt-5'>
            
            <div className='w-full'>
                <label>Loan Tenure (Months)</label>
                <Input type="number" className="" onChange={(e)=>setLoanTenure(e.target.value)}/>
            </div>
             <div className='w-full'>
                <label>Down Payment</label>
                <Input type="number" onChange={(e)=>setDownPayment(e.target.value)}/>
            </div>
        </div>

        {monthlyPayment>0 && <h2 className='font-medium text-2xl mt-5'>Your Mothyly Payment is :  
        <span className='text-4xl font-bold'> {monthlyPayment}</span>
        </h2>}
        <Button onClick={CalculateMonthlyPayment} className="w-full mt-5" size="lg">Calculate</Button>
    </div>
  )
}

export default FinancialCalc
