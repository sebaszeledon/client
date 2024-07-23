import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navLinks } from '../constants';

const Icon = () => (
  <div>
    
  </div>
);

const Sidebar = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to="/">
        <Icon></Icon>
      </Link>
    </div>
  )
}

export default Sidebar