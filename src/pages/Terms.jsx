import React from 'react'

export default function Terms() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white min-h-screen">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-slate-50 mb-6 text-center">Terms of Use</h1>
        <h2 className="text-xl font-bold mb-3 text-green-200">Purpose of the Project:</h2>
        <p className="text-white mb-6">
          The Project aims to collect speech data from participants to support research conducted by Design and Innovation Centre (DIC), UIET, Panjab University. The data collected will be used for research purposes, including but not limited to the development of speech recognition technology, language analysis, and related studies.
        </p>
        <h2 className="text-xl font-bold text-green-200 mb-3">Voluntary Participation:</h2>
        <p className="text-white mb-6">
          Participation in the Project is voluntary. By agreeing to participate, you acknowledge that you have read and understood the terms of this Agreement and consent to the collection, use, and storage of your speech data for the purposes outlined under Purpose of the Project.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Please read these terms of use carefully before participating in the Project. If you disagree with any part of these terms, you must not participate.
        </p>
      </div>
    </div>
  )
}
