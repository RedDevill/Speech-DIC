import React from 'react'

export default function Rights() {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-green-200 text-center">Rights and Permissions</h1>

        <div className="mb-8">
          <div className="bg-gray-700 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-2 text-green-200">Use of Data</h2>
            <p className="text-gray-300 text-lg">
              By participating in the Project, you grant the Organization a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute the collected data for research purposes. This includes the right to create derivative works, perform analysis, and publish findings based on the data, provided that any published work will not identify you personally without your consent.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-gray-700 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-2 text-green-200">Attribution</h2>
            <p className="text-gray-300 text-lg">
              The Organization may, at its discretion, acknowledge your contribution to the Project in any publications or reports resulting from the research, without disclosing your personal information unless you have given explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
