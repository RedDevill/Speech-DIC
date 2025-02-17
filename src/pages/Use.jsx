import React from 'react'

export default function Use() {
  return (
    <div className="bg-slate-gray min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-gray-300 p-6 rounded-md shadow-md">
        <h1 className="text-3xl mb-6 text-green-600">How to Use</h1>
        <p className="text-lg mb-4">1. Select the language in which you want to record sentences.</p>
        <p className="text-lg mb-4">2. Press Record to start.</p>
        <p className="text-lg mb-4">3. Once you press Record button, you will be shown several sentences in the selected language one by one.</p>
        <p className="text-lg mb-4">4. Record yourself saying only the sentence shown on the screen.</p>
        <p className="text-lg mb-4">5. A sentence will be visible for 5 seconds on your screen before switching to another sentence. Record the sentence within that time.</p>
        <p className="text-lg mb-4">6. Press Stop to stop recording. In this case, your progress will be saved, and once you press the Record button again, you will be able to continue from where you left off.</p>
        <p className="text-lg mb-4">7. Once all the requested sentences are completed, you can download the recordings in a zip file by pressing the download button.</p>
      </div>
    </div>
  )
}
