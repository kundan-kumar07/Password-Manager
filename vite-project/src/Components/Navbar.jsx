import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-green-400 flex justify-between p-4'>
      <div>
        <h1 className='font-bold'>Password Manager &lt;/&gt;</h1>
      </div>
      <ul className='flex gap-3.5' >
        <li>
          <a className='hover:text-white' href="/">Home</a></li>
          <li><a className='hover:text-white' href="#">Contact</a></li>
          <li><a className='hover:text-white' href="#">About</a></li>
        
      </ul>

    </nav>
  )
}

export default Navbar
