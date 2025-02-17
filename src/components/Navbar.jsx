import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaProjectDiagram } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import control from '../assets/control.png';

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex sticky left-0 top-0 h-full">
      <div className={` ${open ? "w-72" : "w-20 "} bg-green-800 p-5  pt-8 relative duration-300 h-screen`}>
        <img
          src={control}
          className={`absolute cursor-pointer -right-5 top-9 w-10 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="open"
        />
        <div className="flex gap-x-4 items-center">
          <FaMicrophoneAlt
            src="./src/assets/logo.png"
            className={`cursor-pointer text-white duration-500 ${open && "rotate-[360deg]"}`}
            size={40}
          />
          <h1 className={`text-white font-bold origin-left text-2xl duration-200 ${!open && "scale-0"}`}>
            DIC Speech
          </h1>
        </div>
        <div className="mt-6 bg-white h-1 w-auto"></div>
        <ul className="pt-6">
            <li className={`flex gap-x-4 rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center ${location.pathname === '/' ? 'bg-gray-500' : ''}`}>
              <Link to='/'>
                <FaHome size={25}/>
              </Link>
              <Link className={`${!open && "hidden"} origin-left duration-200 text-xl font-semibold flex gap-x-4`} to='/'>
                Home
              </Link>
            </li>
            <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${location.pathname === '/about' ? 'bg-gray-500' : ''}`}>
              <Link to='/about'>
                <IoIosInformationCircleOutline size={25} className="font-bold"/>
              </Link>
              <Link className={`${!open && "hidden"} origin-left duration-200 text-xl font-semibold flex gap-x-4`} to='/about'>
                About
              </Link>
            </li>
            <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${location.pathname === '/project' ? 'bg-gray-500' : ''}`}>
              <Link to='/project'>
                <FaProjectDiagram size={25} className="font-semibold"/>
              </Link>
              <Link className={`${!open && "hidden"} origin-left duration-200 text-xl font-semibold `} to='/project'>
                Project
              </Link>
            </li>
            <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${location.pathname === '/contact' ? 'bg-gray-500' : ''}`}>
              <Link to='/contact'>
                <RiContactsFill size={25} className="font-semibold"/>
              </Link>
              <Link className={`${!open && "hidden"} origin-left duration-200 text-xl font-semibold`} to='/contact'>
                Contact
              </Link>
            </li>
            <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${location.pathname === '/submit' ? 'bg-gray-500' : ''}`}>
              <a href="https://forms.gle/jbHHEx8sChf1YjrWA" target="_blank">
                <MdOutlineQueuePlayNext size={25} className="font-semibold"/>
              </a>
              <a className={`${!open && "hidden"} origin-left duration-200 text-xl font-semibold`} href="https://forms.gle/5mXCLD7UNFWVAheL8" target="_blank">
                Submit Recordings
              </a>
            </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;