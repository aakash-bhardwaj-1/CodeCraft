import React, { useState } from 'react';

const DatePickerPopup = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedDate);
    setIsVisible(false); // Close the popup on submit
  };

  const handleClose = () => {
    setIsVisible(false); // Close the popup on close button click
  };

  if (!isVisible) return null; // Render nothing if the popup is not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Select Date</h2>
        <input
          type="date"
          className="border rounded px-2 py-1 mb-4"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Submit
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerPopup;
