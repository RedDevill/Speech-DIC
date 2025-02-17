import React from 'react'
import Footer from '../components/Footer'
import { HiOutlineDocumentText, HiOutlineDatabase, HiOutlineSparkles } from 'react-icons/hi';

export default function Project() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">About Our Project</h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 font-medium text-lg">
            <p className="text-gray-300 mb-4">
              A speech/audio dataset plays a vital role in the development and implementation of machine learning (ML) models for speech-related tasks. It serves as the foundation upon which these models are trained, evaluated, and fine-tuned.
            </p>

            <p className="text-gray-300 mb-4">
              The project is developed with the primary objective of collecting speech datasets. This application incorporates essential features like user authentication, implemented through Firebase, to ensure secure access to the system. The project is a web application that addresses a crucial need in the ML community. It empowers researchers and developers to gather a large-scale, diverse, and high-quality dataset, enhancing the accuracy and performance of ML models in speech-related tasks. The availability of such a dataset facilitates advancements in speech technology, leading to improved speech recognition systems, natural language understanding, and a wide range of voice-driven applications.
            </p>

            <p className="text-gray-300 mb-4">
              By creating this web application, the project aims to facilitate the collection of speech data, which is an essential component in the development of machine learning models and speech-related applications. The recorded audio snippets will contribute to the creation of a diverse and comprehensive dataset, enabling researchers and developers to train and fine-tune their models with real-world speech samples.
            </p>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg flex items-center justify-center">
                <HiOutlineDocumentText className="text-3xl" />
              </div>
              <div className="p-4 bg-gray-700 rounded-lg flex items-center justify-center">
                <HiOutlineDatabase className="text-3xl" />
              </div>
              <div className="p-4 bg-gray-700 rounded-lg flex items-center justify-center">
                <HiOutlineSparkles className="text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
