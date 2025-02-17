import React from 'react'
import {AiFillFacebook, AiFillInstagram, AiFillRedditCircle, AiFillTwitterCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='flex flex-col md:flex-row px-16 mt-4 bg-gray-800 text-white w-full'>
        <div className='flex-1 mt-6 flex flex-col gap-4'>
          <div className='flex flex-col justify-between gap-4 border-b-2 pb-4 items-end mr-64 px-4'>
            <div className='flex flex-col gap-1'>
              <p className='font-semibold text-xl'>Connect With Us</p>
              <div className='flex gap-3'>
                <a href="https://www.facebook.com/" className='hover:scale-110 transition-all delay-100 ease-in-out' target='_blank' rel='noreferrer'><AiFillFacebook size={35}/></a>
                <a href="https://www.instagram.com/" className='hover:scale-110 transition-all delay-100 ease-in-out' target='_blank' rel='noreferrer'><AiFillInstagram size={35}/></a>
                <a href="https://twitter.com/" className='hover:scale-110 transition-all delay-100 ease-in-out' target='_blank' rel='noreferrer'><AiFillTwitterCircle size={35}/></a>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 pb-4 items-end mr-64 px-4'>
            <div className='flex gap-8 flex-wrap md:flex-nowrap'> {/* Added flex-wrap class */}
              <Link to='/rights'>
                <p className='pr-6 border-r-2 hover:underline'>Rights and Permissions</p>
              </Link>
              <Link to='/terms'>
                <p className='pr-6 border-r-2 hover:underline'>Terms and Condition</p>
              </Link>
              <Link to='/privacy'>
                <p className='pr-6 border-r-2 hover:underline'>Privacy</p>
              </Link>
              <Link to='/use'>
                <p className='hover:underline'>How to Use</p>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}
