import React, { useState, useEffect, useRef } from 'react';
import AudioTimer from './AudioTimer';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

// Inline Equalizer component
const Equalizer = () => (
  <div className="equalizer-container">
    <div className="bar" />
    <div className="bar" />
    <div className="bar" />
    <div className="bar" />
    <style>{`
      .equalizer-container {
        display: flex;
        gap: 4px;
        align-items: flex-end;
        height: 40px;
        margin-bottom: 8px;
      }
      .bar {
        width: 8px;
        background-color: #4CAF50;
        animation: equalize 1s infinite;
      }
      .bar:nth-child(1) { animation-delay: 0s; }
      .bar:nth-child(2) { animation-delay: 0.2s; }
      .bar:nth-child(3) { animation-delay: 0.4s; }
      .bar:nth-child(4) { animation-delay: 0.6s; }
      @keyframes equalize {
        0% { height: 20%; }
        50% { height: 100%; }
        100% { height: 20%; }
      }
    `}</style>
  </div>
);

export default function ReactRecorder() {
  const [voice, setVoice] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [recordBlobLinks, setRecordBlobLinks] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [sentencesUsed, setSentencesUsed] = useState([]);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  // Sentences in different languages
  const sentencesByLanguage = {
    english: [
      "1. I would like to open a new savings account.",
      "2. I need to deposit this check into my account.",
      "3. Please fill out this deposit slip and I'll process it for you.",
      "4. I forgot my PIN. Can you help me reset it?",
      "5. I'll reset your PIN for you. Do you have your identification card with you?",
      "6. I'm interested in getting a loan for a car.",
      "7. Let's discuss your loan options and the required documentation.",
      "8. How long did it take for my loan application to get approved?",
      "9. I'm having trouble accessing my online banking. Can you assist me?",
      "10. I'd like to withdraw Rs 20000 from my account.",
      "11. I'd like to inquire about my current account balance.",
      "12. Can you help me understand the different types of credit cards you offer?",
      "13. I need to transfer funds to another account. How can I do that?",
      "14. Can I deposit this check into my current account?",
      "15. Please sign the back of the check and fill out this deposit slip.",
      "16. A customer has requested a credit card with a higher spending limit.",
      "17. Please provide your identification and address proof?",
      "18. What's the minimum balance requirement for a savings account here?",
    ],
    hindi: [
      "1. मैं एक नया बचत खाता खोलना चाहता हूं.",
      "2. मुझे यह चेक अपने खाते में जमा करना है।",
      "3. कृपया इस जमा पर्ची को भरें और मैं इसे आपके लिए प्रोसेस कर दूंगा।",
      "4. मैं अपना पिन भूल गया। क्या आप इसे रीसेट करने में मेरी मदद कर सकते हैं?",
      "5. मैं आपके लिए आपका पिन रीसेट कर दूंगा। क्या आपके साथ आपकी पहचान कार्ड है?",
      "6. मुझे कार के लिए ऋण प्राप्त करने में दिलचस्पी है।",
      "7. आइए आपके ऋण विकल्पों और आवश्यक दस्तावेज़ीकरण पर चर्चा करें।",
      "8. मेरे ऋण आवेदन को स्वीकृत होने में कितना समय लगा?",
      "9. मुझे अपने ऑनलाइन बैंकिंग उपयोग करने में समस्या हो रही है। क्या आप मेरी सहायता कर सकते हैं?",
      "10. मैं अपने खाते से 20000 रुपये निकालना चाहता हूं",
      "11. मैं अपने चालू खाते की शेष राशि के बारे में पूछताछ करना चाहता/चाहती हूं.",
      "12. क्या आप मुझे आपके द्वारा प्रदान किए जाने वाले विभिन्न प्रकार के क्रेडिट कार्ड को समझने में मदद कर सकते हैं?",
      "13. मुझे दूसरे खाते में धनराशि स्थानांतरित करने की आवश्यकता है। मेरे द्वारा ऐसा कैसे किया जा सकता है?",
      "14. क्या मैं इस चेक को अपने चालू खाते में जमा कर सकता हूँ?",
      "15. कृपया चेक के पीछे हस्ताक्षर करें और इस जमा पर्ची को भरें।",
      "16. एक ग्राहक ने अधिक खर्च सीमा वाले क्रेडिट कार्ड का अनुरोध किया है।",
      "17. कृपया अपनी पहचान और पते का प्रमाण प्रदान करें?",
      "18. यहां बचत खाते के लिए न्यूनतम शेष राशि क्या है?",
    ],
    punjabi: [
      "1. ਮੈਂ ਇੱਕ ਨਵਾਂ ਬੱਚਤ ਖਾਤਾ ਖੋਲ੍ਹਣਾ ਚਾਹਾਂਗਾ।",
      "2. ਮੈਨੂੰ ਇਹ ਚੈਕ ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾ ਕਰਨ ਦੀ ਲੋੜ ਹੈ।",
      "3. ਕਿਰਪਾ ਕਰਕੇ ਇਸ ਡਿਪਾਜ਼ਿਟ ਸਲਿੱਪ ਨੂੰ ਭਰੋ ਅਤੇ ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਇਸਦੀ ਪ੍ਰਕਿਰਿਆ ਕਰਾਂਗਾ।",
      "4. ਮੈਂ ਆਪਣਾ ਪਿੰਨ ਭੁੱਲ ਗਿਆ ਹਾਂ। ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ ਰੀਸੈਟ ਕਰਨ ਵਿੱਚ ਮੇਰੀ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?",
      "5. ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਤੁਹਾਡਾ ਪਿੰਨ ਰੀਸੈੱਟ ਕਰ ਦਵਾਂਗਾ। ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਤੁਹਾਡੀ ਪਛਾਣ ਹੈ?",
      "6. ਮੈਂ ਕਾਰ ਲਈ ਕਰਜ਼ਾ ਲੈਣ ਵਿੱਚ ਦਿਲਚਸਪੀ ਰੱਖਦਾ ਹਾਂ।",
      "7. ਆਉ ਤੁਹਾਡੇ ਲੋਨ ਦੇ ਵਿਕਲਪਾਂ ਅਤੇ ਜਰੂਰੀ ਦਸਤਾਵੇਜ਼ਾਂ 'ਤੇ ਚਰਚਾ ਕਰੀਏ।",
      "8. ਮੇਰੀ ਲੋਨ ਅਰਜ਼ੀ ਨੂੰ ਮਨਜ਼ੂਰੀ ਮਿਲਣ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਾ?",
      "9. ਮੈਨੂੰ ਆਪਣੀ ਔਨਲਾਈਨ ਬੈਂਕਿੰਗ ਵਰਤਨ ਵਿੱਚ ਸਮੱਸਿਆ ਆ ਰਹੀ ਹੈ। ਕੀ ਤੁਸੀਂ ਮੇਰੀ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?",
      "10. ਮੈਂ ਆਪਣੇ ਖਾਤੇ ਵਿੱਚੋਂ 20000 ਰੁਪਏ ਕਢਵਾਉਣਾ ਚਾਹਾਂਗਾ।",
      "11. ਮੈਂ ਆਪਣੇ ਮੌਜੂਦਾ ਖਾਤੇ ਦੇ ਬਕਾਏ ਬਾਰੇ ਪੁੱਛਗਿੱਛ ਕਰਨਾ ਚਾਹੁੰਦੀ ਹਾਂ।",
      "12. ਕੀ ਤੁਸੀਂ ਮੈਨੂੰ ਤੁਹਾਡੇ ਦੁਆਰਾ ਪੇਸ਼ ਕੀਤੇ ਜਾਂਦੇ ਵੱਖ-ਵੱਖ ਕਿਸਮਾਂ ਦੇ ਕ੍ਰੈਡਿਟ ਕਾਰਡਾਂ ਨੂੰ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?",
      "13. ਮੈਨੂੰ ਕਿਸੇ ਹੋਰ ਖਾਤੇ ਵਿੱਚ ਫੰਡ ਟ੍ਰਾਂਸਫਰ ਕਰਨ ਦੀ ਲੋੜ ਹੈ। ਮੈਂ ਇਹ ਕਿਵੇਂ ਕਰ ਸਕਦਾ ਹਾਂ?",
      "14. ਕੀ ਮੈਂ ਇਹ ਚੈਕ ਆਪਣੇ ਮੌਜੂਦਾ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾ ਕਰ ਸਕਦਾ ਹਾਂ?",
      "15. ਕਿਰਪਾ ਕਰਕੇ ਚੈਕ ਦੇ ਪਿੱਛੇ ਹਸਤਾਖਰ ਕਰੋ ਅਤੇ ਇਸ ਡਿਪਾਜ਼ਿਟ ਸਲਿੱਪ ਨੂੰ ਭਰੋ।",
      "16. ਇੱਕ ਗਾਹਕ ਨੇ ਵਧੇਰੇ ਖਰਚ ਸੀਮਾ ਵਾਲੇ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਦਾ ਮੰਗ ਪੱਤਰ ਦਿੱਤਾ ਹੈ।",
      "17. ਕਿਰਪਾ ਕਰਕੇ ਤੁਹਾਡੀ ਪਛਾਣ ਅਤੇ ਖੋਜ ਦਾ ਪ੍ਰਮਾਣ ਪ੍ਰਦਾਨ ਕਰੋ?",
      "18. ਇੱਥੇ ਬਚਤ ਖਾਤੇ ਲਈ ਘੱਟੋ-ਘੱਟ ਰਕਮ ਕੀ ਹੈ?",
    ],

    mixed: [
      "1. मैं एक नया savings account खोलना चाहता हूं",
      "2. मुझे यह cheque अपने account में जमा करना है।",
      "3. कृपया इस deposit slip को भरें और मैं इसे आपके लिए process कर दूंगा।",
      "4. मैं अपना PIN भूल गया। क्या आप इसे reset करने में मेरी help कर सकते हैं?",
      "5. मैं आपके लिए आपका PIN reset कर दूंगा। क्या आपके साथ आपका identification card है?",
      "6. मैं car के लिए loan लेने में interested हूं",
      "7. आइए आपके loan options और आवश्यक documentation पर चर्चा करें",
      "8. मेरे loan application को approved होने में कितना समय लगा?",
      "9. मुझे अपनी online banking use करने में problem हो रही है। क्या आप मुझे assist कर सकते हैं?",
      "10. मैं अपने account से Rs 20000 withdraw करना चाहता हूं।",
      "11. मैं अपने current account balance के बारे में inquire करना चाहता/चाहती हूं.",
      "12. क्या आप मुझे आपके द्वारा offer किए जाने वाले multiple credit cards को समझने में help कर सकते हैं?",
      "13. मुझे दूसरे account में funds transfer करने की आवश्यकता है। मैं इसे कैसे कर सकता हूं?",
      "14. क्या मैं इस cheque को अपने current account में deposit कर सकता हूँ?",
      "15. कृपया cheque के पीछे sign करें और इस deposit slip को भरें।",
      "16. एक customer ने higher spending limit वाले credit card कि request की है।",
      "17. कृपया अपनी identification और address proof प्रदान करें?",
      "18. यहां savings account के लिए minimum balance requirement क्या है?",
    ],

    mixed_punjabi: [
      "1.	ਮੈਂ ਇੱਕ ਨਵਾਂ savings account ਖੋਲ੍ਹਣਾ ਚਾਹਾਂਗਾ।",
      "2. ਮੈਨੂੰ ਇਹ cheque ਆਪਣੇ account ਵਿੱਚ deposit ਕਰਨਾ ਹੈ।",
      "3.	ਕਿਰਪਾ ਕਰਕੇ ਇਸ deposit slip ਨੂੰ ਭਰੋ ਅਤੇ ਮੈਂ ਤੁਹਾਡੇ ਲਈ process ਕਰਾਂਗਾ।",
      "4. ਮੈਂ ਆਪਣਾ PIN ਭੁੱਲ ਗਿਆ ਹਾਂ। ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ reset ਕਰਨ ਵਿੱਚ ਮੇਰੀ help ਕਰ ਸਕਦੇ ਹੋ?ਮੈਂ ਆਪਣਾ PIN ਭੁੱਲ ਗਿਆ ਹਾਂ। ਕੀ ਤੁਸੀਂ ਇਸਨੂੰ reset ਕਰਨ ਵਿੱਚ ਮੇਰੀ help ਕਰ ਸਕਦੇ ਹੋ?",
      "5. ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਤੁਹਾਡਾ PIN reset ਕਰ ਦਵਾਂਗਾ। ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਤੁਹਾਡੀ identification card ਹੈ",
      "6. ਮੈਂ car ਲਈ loan ਲੈਣ ਵਿੱਚ interested ਹਾਂ।",
      "7. ਆਉ ਤੁਹਾਡੇ loan options ਅਤੇ documentation 'ਤੇ ਚਰਚਾ ਕਰੀਏ।",
      "8. ਮੇਰੀ loan application ਨੂੰ approved ਹੋਣ ਵਿੱਚ ਕਿੰਨਾ time ਲੱਗਾ?",
      "9. ਮੈਨੂੰ ਆਪਣੀ online banking use ਕਰਨ ਵਿੱਚ problem ਆ ਰਹੀ ਹੈ। ਕੀ ਤੁਸੀਂ ਮੈਨੂੰ assist ਕਰ ਸਕਦੇ ਹੋ?",
      "10. ਮੈਂ ਆਪਣੇ account ਵਿੱਚੋਂ Rs 20000 withdraw ਕਰਨਾ ਚਾਹਾਂਗਾ।",
      "11. ਮੈਂ ਆਪਣੇ current account balance ਬਾਰੇ inquire ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ।",
      "12. ਕੀ ਤੁਸੀਂ ਮੈਨੂੰ ਤੁਹਾਡੇ ਦੁਆਰਾ offer ਕੀਤੇ multiple credit cards ਨੂੰ ਸਮਝਣ ਵਿੱਚ help ਕਰ ਸਕਦੇ ਹੋ?",
      "13. ਮੈਨੂੰ ਕਿਸੇ ਹੋਰ account ਵਿੱਚ funds transfer ਕਰਨ ਦੀ ਲੋੜ ਹੈ। ਮੈਂ ਇਹ ਕਿਵੇਂ ਕਰ ਸਕਦਾ ਹਾਂ?",
      "14. ਕੀ ਮੈਂ ਇਹ cheque ਆਪਣੇ current account ਵਿੱਚ deposit ਕਰ ਸਕਦਾ ਹਾਂ?",
      "15. ਕਿਰਪਾ ਕਰਕੇ cheque ਦੇ ਪਿੱਛੇ sign ਕਰੋ ਅਤੇ ਇਸ deposit slip ਨੂੰ ਭਰੋ।",
      "16. ਇੱਕ customer ਨੇ higher spending limit ਵਾਲੇ credit card ਦੀ request ਕੀਤੀ ਹੈ।",
      "17. ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ identification ਅਤੇ address proof ਪ੍ਰਦਾਨ ਕਰੋ?",
      "18. ਇੱਥੇ savings account ਲਈ minimum balance requirement ਕੀ ਹੈ?",
    ],
  };

  useEffect(() => {
    setVoice(false);
  }, [currentSentenceIndex]);

  const startRecording = async () => {
    try {
      if (!streamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      }
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/mp3' });
        const blobURL = URL.createObjectURL(blob);
        setRecordBlobLinks((prevLinks) => [...prevLinks, blobURL]);
        chunksRef.current = [];
        setIsRunning(false);
        setVoice(false);
        setTimeout(() => {
          handleNextSentence();
        }, 500);
      };
      setElapsedTime(0);
      setIsRunning(true);
      setVoice(true);
      mediaRecorder.start();
    } catch (err) {
      console.error(err);
    }
  };

  const startHandle = () => {
    if (currentSentenceIndex < sentencesByLanguage[selectedLanguage].length) {
      startRecording();
    }
  };

  const stopHandle = () => {
    setSentencesUsed((prevSentences) => [
      ...prevSentences,
      sentencesByLanguage[selectedLanguage][currentSentenceIndex],
    ]);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const clearHandle = () => {
    setIsRunning(false);
    setVoice(false);
    setRecordBlobLinks([]);
    setElapsedTime(0);
    setCurrentSentenceIndex(0);
    setSentencesUsed([]);
  };

  const handleDownload = () => {
    if (recordBlobLinks.length > 0) {
      const zip = new JSZip();
      recordBlobLinks.forEach((blobURL, index) => {
        fetch(blobURL)
          .then((res) => res.blob())
          .then((blob) => {
            zip.file(`recorded_audio_${index + 1}_${selectedLanguage}.mp3`, blob);
            if (index === recordBlobLinks.length - 1) {
              zip.generateAsync({ type: 'blob' }).then((content) => {
                saveAs(content, `recorded_audio_${selectedLanguage}.zip`);
              });
            }
          });
      });
    }
  };

  const handleNextSentence = () => {
    setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCurrentSentenceIndex(0);
  };

  const handleDownloadAudio = (blobURL, index) => {
    const blob = new Blob([blobURL], { type: 'audio/mp3' });
    saveAs(blob, `recorded_audio_${index + 1}_${selectedLanguage}.mp3`);
  };

  const handleDeleteAudio = (index) => {
    // Remove the audio blob link
    const updatedBlobLinks = [...recordBlobLinks];
    updatedBlobLinks.splice(index, 1);
    setRecordBlobLinks(updatedBlobLinks);

    // Also remove the corresponding sentence details
    const updatedSentencesUsed = [...sentencesUsed];
    updatedSentencesUsed.splice(index, 1);
    setSentencesUsed(updatedSentencesUsed);
  };

  // Add new function to navigate to a particular sentence index and clear later recordings.
  const handleNavigateSentence = (index) => {
    setCurrentSentenceIndex(index);
    setRecordBlobLinks((prev) => prev.slice(0, index));
    setSentencesUsed((prev) => prev.slice(0, index));
    setVoice(false);
    setIsRunning(false);
  };

  return (
    <div className="w-full p-4 flex flex-col items-center gap-2 bg-slate-200">
      <h2 className="text-3xl mt-4 font-bold text-green-800 mb-4">Audio Recorder</h2>
      {/* language select */}
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="bg-white text-black rounded-md py-1 px-3 font-semibold text-lg mb-2"
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="punjabi">Punjabi</option>
        <option value="mixed">Mixed (Eng+Hi)</option>
        <option value="mixed_punjabi">Mixed (Eng+Pb)</option>
      </select>

      {/* Navigation for sentence indices */}
      <div className="sentence-navigation my-4 w-fit mx-auto bg-slate-100 p-2 rounded-md shadow">
        <h6 className="text-lg font-bold text-blue-800 mb-2 text-center">
          Sentence Navigation
        </h6>
        {sentencesByLanguage[selectedLanguage].map((_, i) => (
          <button
            key={i}
            onClick={() => handleNavigateSentence(i)}
            className={`px-2 py-1 m-1 rounded-md ${
              i === currentSentenceIndex
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <ul className="list-disc pl-4 text-sm font-medium text-gray-700 mt-2">
          <li>Speak clearly and loudly to ensure the audio is recorded properly.</li>
          <li>Try test runs with 2 or 3 sentences to ensure your mic and audio are recording clearly.</li>
          <li>Do not skip any sentences during recording. If needed, re-record them carefully.</li>
          <li>If an audio is not recorded properly, then delete it and click on the corresponding button to return to that sentence.</li>
          <li>Avoid skipping sentences at all times. Make sure to re-record any sentence that wasn’t captured properly.</li>
        </ul>
        <p className="text-sm font-bold text-gray-700 mt-2">
          Note: Navigating back will remove all recordings after the selected sentence.
        </p>
      </div>

      {/* sentences shown */}
      <div className="border-slate-300 bg-slate-100 mt-4 py-2 border-2 rounded-md h-fit w-[200px] md:w-[800px] px-6">
        {sentencesByLanguage[selectedLanguage] &&
        currentSentenceIndex === sentencesByLanguage[selectedLanguage].length ? (
          <p className="text-lg font-semibold text-blue-800">Recording Finished</p>
        ) : (
          <p className="text-lg font-semibold leading-10">
            {sentencesByLanguage[selectedLanguage][currentSentenceIndex]}
          </p>
        )}
      </div>

      {/* Render Equalizer when recording */}
      {voice && <Equalizer />}

      <AudioTimer
        isRunning={isRunning}
        elapsedTime={elapsedTime}
        setElapsedTime={setElapsedTime}
      />

      <div className="flex flex-col items-center justify-between md:flex-row mt-6 gap-4">
        {/* start stop buttons */}
        <div className="">
          {!voice ? (
            <button
              onClick={startHandle}
              className={`${
                currentSentenceIndex < sentencesByLanguage[selectedLanguage].length
                  ? 'bg-white text-black hover:bg-gray-500 hover:text-white'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              } font-semibold text-lg py-2 px-6 rounded-md`}
              disabled={currentSentenceIndex === sentencesByLanguage[selectedLanguage].length}
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopHandle}
              className="bg-white text-black font-semibold text-lg py-2 px-6 rounded-md hover:bg-gray-500 hover:text-white"
            >
              Stop
            </button>
          )}
        </div>
        {/* reset and zip button */}
        <div className="flex flex-col gap-4 justify-between items-center md:flex-row md:gap-4">
          {recordBlobLinks.length > 0 && (
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={clearHandle}
                className="bg-red-500 text-white font-semibold text-lg py-2 px-6 rounded-md"
              >
                Clear
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white font-semibold text-lg py-2 px-6 rounded-md"
              >
                Download All as ZIP
              </button>
            </div>
          )}
        </div>
      </div>

      {/* recorded audios */}
      <div className="mt-8 flex flex-col items-center w-11/12 py-4">
        {recordBlobLinks.map((blobURL, index) => (
          <div
            key={index}
            className="border-2 px-8 py-4 border-slate-400 flex flex-col gap-8 items-center md:flex-row justify-center"
          >
            <div className="w-64 flex-shrink-0">
              <p>{sentencesUsed[index]}</p>
            </div>
            <div className="w-64 flex-shrink-0">
              <audio controls src={blobURL} className="mb-2 w-[250px] md:w-[300px]" />
            </div>
            <div className="flex-shrink-0 ml-2">
              <button
                onClick={() => handleDownloadAudio(blobURL, index)}
                className="text-blue-500 font-semibold text-lg py-2 px-6 rounded-md mr-2 hover:text-blue-700"
              >
                Download MP3
              </button>
              <button
                onClick={() => handleDeleteAudio(index)}
                className="text-red-500 font-semibold text-lg py-2 px-6 rounded-md hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}