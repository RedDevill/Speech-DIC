import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import microphone from "../assets/microphone.avif"

const Home = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='min-h-screen overflow-hidden w-screen relative'>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className='w-2/6'>
            <div className="bg-white p-8 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-6">Important Information</h2>
              <p className="text-lg mb-4">By creating this web application, the project aims to facilitate the collection of speech data, which is an essential component in the development of machine learning models and speech-related applications. The recorded audio snippets will contribute to the creation of a diverse and comprehensive dataset, enabling researchers and developers to train and fine-tune their models with real-world speech samples.</p>
              <button className="bg-emerald-500 text-white px-8 py-2 rounded-md" onClick={closeModal}>Continue</button>
            </div>
          </div>
        </div>
      )}
      <div className='mx-auto w-11/12 p-8 flex flex-col md:flex-row justify-between'>
        <div className='mb-8 flex flex-col justify-center gap-8 md:w-96'>
          <h1 className='text-4xl font-bold'>
            DIC Speech <span className='text-gray-400'>Dataset Collection</span> Project
          </h1>
          <Link to='/instructions' className='w-fit rounded-full font-semibold p-3 mt-4 flex items-center text-slate-100 text-lg bg-emerald-700  hover:text-gray-300'>
            Get Started... <FaArrowRight className='ml-2' />
          </Link>
        </div>
        <div className='shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] md:self-center md:ml-8'>
          <img src={microphone} alt="micro" className="w-full h-auto md:h-[400px] md:w-[400px]  lg:w-[800px] rounded-sm"/>
        </div>
      </div>

      <div className='fixed bottom-0 w-full max-w-screen'>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
