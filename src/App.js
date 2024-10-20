import React, { useState } from 'react';
import { saveAs } from 'file-saver';

function App() {
  const [base64Input, setBase64Input] = useState('');

  const handleInputChange = (e) => {
    setBase64Input(e.target.value);
  };

  const convertToPDF = () => {
    try {
      // Remove data URI prefix if present
      const base64Data = base64Input.replace(/^data:application\/pdf;base64,/, '');

      // Convert base64 to Uint8Array
      const binaryData = atob(base64Data);
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }

      // Create Blob and download PDF
      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      saveAs(blob, 'converted.pdf');
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert('Error converting to PDF. Please check your base64 input.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-center">Created By- Shailendra Kumar</h3>
        <h1 className="text-2xl font-bold mb-4 text-center">Base64 to PDF Converter</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="10"
          value={base64Input}
          onChange={handleInputChange}
          placeholder="Paste your base64-encoded PDF data here"
        />
        {base64Input && (
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={convertToPDF}
          >
            Convert to PDF
          </button>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-center">After clicking on convert to pdf wait for few seconds download will appears</h3>
    </div>
  );
}

export default App;