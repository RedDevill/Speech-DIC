import React from 'react'

export default function Privacy() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-green-200 text-center">Confidentiality and Data Privacy</h1>

        <div className="mb-8">
          <div className="bg-gray-700 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-2 text-green-200">Confidentiality</h2>
            <p className="text-gray-300 text-lg">
              The Organization acknowledges the confidential nature of the data collected and agrees to treat the data as confidential. The data will be stored securely and accessed only by authorized personnel involved in the Project.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-gray-700 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-2 text-green-200">Data Privacy</h2>
            <p className="text-gray-300 text-lg">
              The Organization will handle your personal information and speech data in accordance with applicable data protection laws. Your personal information and speech data will not be shared with any third parties without your explicit consent, except as required by law.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
