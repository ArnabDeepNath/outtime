import { useState } from 'react';

function calculateOutTime(inTime) {
  if (!inTime) {
    return {
      outTime12: '',
      outTime24: '',
    };
  }

  const [hours, minutes] = inTime.split(':').map(Number);

  const totalMinutes = hours * 60 + minutes + 7 * 60 + 30;
  let outHours = Math.floor(totalMinutes / 60) % 24;
  const outMinutes = totalMinutes % 60;

  const ampm = outHours >= 12 ? 'PM' : 'AM';
  const outHours12 = outHours % 12 === 0 ? 12 : outHours % 12;

  const outTime12 = `${outHours12}:${outMinutes.toString().padStart(2, '0')} ${ampm}`;
  const outTime24 = `${outHours.toString().padStart(2, '0')}:${outMinutes.toString().padStart(2, '0')}`;

  return {
    outTime12,
    outTime24,
  };
}

export default function App() {
  const [inTime, setInTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeChange = (e) => {
    setInTime(e.target.value);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setInTime(time);
  };

  const { outTime12, outTime24 } = calculateOutTime(inTime);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Time Calculator</h1>

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="inTime" className="block text-gray-700 text-sm font-bold mb-2">
            Enter In Time (HH:MM):
          </label>
          <input
            type="time"
            id="inTime"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inTime}
            onChange={handleTimeChange}
          />
        </div>

        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-bold mb-2">Or select a time:</p>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleTimeSelect('08:00')}
            >
              08:00
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleTimeSelect('09:00')}
            >
              09:00
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleTimeSelect('10:00')}
            >
              10:00
            </button>
          </div>
        </div>

        <div>
          <p className="block text-gray-700 text-sm font-bold mb-2">Out Time (7 hours 30 minutes later):</p>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">12-hour format:</span>
            <span className="ml-2 text-gray-800">{outTime12}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">24-hour format:</span>
            <span className="ml-2 text-gray-800">{outTime24}</span>
          </div>
        </div>
      </div>
    </div>
  );
}