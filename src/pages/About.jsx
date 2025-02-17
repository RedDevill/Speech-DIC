import React from 'react';
import labImage from '../assets/download.jpeg';

export default function About() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 text-lg">
            <p className="text-gray-300 mb-4 text-justify">
              We are DIC-UIET, an interdisciplinary Research Lab based in UIET, Panjab University, Chandigarh, India. We investigate novel concepts that underlie the complexities of our field. Our research is supported by funding from the government and a number of foundations. Several ideas are being pursued for developing a new pedagogy in teaching and training in design, new fabrications, and innovations. A number of design technologies for smart cities, biomedical devices, advanced materials, navigational and tourism aids, green environment, energy & traffic management, communication, etc have been taken up at the DIC in Panjab University.
            </p>

            <p className="text-gray-300 mb-4 text-justify">
              DIC Panjab University and DIC SPA (Delhi) are integral parts of our research network, collaborating on various projects and initiatives aimed at advancing technology and design in different domains.
            </p>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center px-4">
            <img src={labImage} alt="Lab" className="w-full h-auto"/>
          </div>
        </div>
      </div>
    </div>
  )
}
