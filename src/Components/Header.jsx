import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
const Header = () => {
  return (
    <div className="h-25 flex justify-between items-center shadow-sm p-5">
      <img src="/logo.svg" className='h-40 w-auto' alt="" />

      <ul className='hidden md:flex gap-16'>
        <Link to={'/'}>
          <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li>
        </Link>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>About Us</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Contact Us</li>
      </ul>

      <SignedIn>
        <div className='flex items-center gap-5'>
          <UserButton />
          <Link to={'/profile'}>
            <Button className='bg-blue-500'>Submit Listing</Button>
          </Link>
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Submit Listing</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Header;
