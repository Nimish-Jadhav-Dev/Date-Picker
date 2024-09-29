"use client";
import { useDatePickerStore } from '../../state_management/date-store';
import React, { useState } from 'react';

export const RecurrenceOptions = () => {
  const { recurrence, updateRecurrence } = useDatePickerStore();
  const [interval, setInterval] = useState(1);  // For 'every X days/weeks/months/years'
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([]);  // For specific days of the week
  const [nthDay, setNthDay] = useState({ week: 1, day: 1 });  // For nth day of the month
  
  const handleRecurrenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateRecurrence(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly');
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterval(Number(e.target.value));
  };

  const handleNthDayChange = (week: number, day: number) => {
    setNthDay({ week, day });
  };

  const toggleDayOfWeek = (day: number) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-4">
      <label className="block font-semibold">Recurrence</label>
      <select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="border p-2 rounded w-full"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Customization for interval-based recurrence */}
      <div>
        <label className="block font-semibold">Every X {recurrence}</label>
        <input
          type="number"
          value={interval}
          onChange={handleIntervalChange}
          className="border p-2 rounded w-full"
          min={1}
        />
      </div>

      {/* Customization for specific days of the week */}
      {recurrence === 'weekly' && (
        <div>
          <label className="block font-semibold">Specific Days of the Week</label>
          <div className="flex space-x-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <button
                key={index}
                onClick={() => toggleDayOfWeek(index)}
                className={`p-2 rounded ${
                  daysOfWeek.includes(index) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Customization for nth day of the month */}
      {recurrence === 'monthly' && (
        <div>
          <label className="block font-semibold">The nth day of the month</label>
          <div className="flex space-x-2">
            <select value={nthDay.week} onChange={(e) => handleNthDayChange(Number(e.target.value), nthDay.day)}>
              <option value={1}>First</option>
              <option value={2}>Second</option>
              <option value={3}>Third</option>
              <option value={4}>Fourth</option>
              <option value={5}>Last</option>
            </select>
            <select value={nthDay.day} onChange={(e) => handleNthDayChange(nthDay.week, Number(e.target.value))}>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <option value={index} key={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
