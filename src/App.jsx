import { useState } from "react";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "aRhA5SSsru8VYe2/ZsP6Ig==tVUZdHWruJ4ZBPUO",
  },
};

const baseUrl = `https://api.api-ninjas.com/v1/qrcode?format=png&data=`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [qrCode, setQrCode] = useState("");

  const getQrCode = async (e) => {
    e.preventDefault();
    const response = await fetch(baseUrl + inputValue, options);
    const result = await response.text();
    setQrCode(result);
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-6">QR Code Generator</h1>

          {!qrCode && (
            <form onSubmit={getQrCode} className="space-y-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="QR code"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Generate QR Code
              </button>
            </form>
          )}

          {qrCode && (
            <div className="space-y-4">
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code"
                className="mx-auto rounded-lg shadow-md"
              />
              <a
                href={`data:image/png;base64,${qrCode}`}
                download={"YourQRCode.png"}
                className="block text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Download your QR Code
              </a>
            </div>
          )}

          <button
            onClick={() => setQrCode("")}
            className="mt-4 p-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Clear QR Code
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
