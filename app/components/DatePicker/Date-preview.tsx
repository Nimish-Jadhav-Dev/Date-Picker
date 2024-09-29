import { useDatePickerStore } from '../../state_management/date-store';
import React from 'react';
import '@/app/styles/calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns'; // Helps with date calculations

export const DatePreview = () => {
  const { startDate, endDate, recurrence, interval, daysOfWeek, nthDay } = useDatePickerStore(); // Fetch interval, daysOfWeek, and nthDay

  const getNthDayOfMonth = (date: Date, week: number, dayOfWeek: number): Date | null => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    let currentDay = monthStart;
    let count = 0;
  
    // Loop through the days of the month
    while (currentDay.getMonth() === monthStart.getMonth()) {
      if (currentDay.getDay() === dayOfWeek) {
        count++;
        if (count === week) {
          return currentDay;
        }
      }
      currentDay = addDays(currentDay, 1);  // Move to the next day
    }
  
    return null;  // Return null if the nth occurrence doesn't exist
  };
  
  const generateRecurringDates = () => {
    if (!startDate) return [];
  
    const recurringDates: Date[] = [];
  
    switch (recurrence) {
      case 'daily':
        for (let i = 0; i < 365; i++) {  // Generate up to 1 year of recurring dates
          recurringDates.push(addDays(startDate, i * interval));  // Use custom interval for daily recurrence
        }
        break;
  
      case 'weekly':
        for (let i = 0; i < 52; i++) {  // Generate up to 1 year of weekly dates
          const baseDate = addWeeks(startDate, i * interval);
          // Check specific days of the week if selected
          if (daysOfWeek.length > 0) {
            for (const dayOfWeek of daysOfWeek) {
              const dateForDay = addDays(baseDate, dayOfWeek - baseDate.getDay());  // Adjust for day of the week
              recurringDates.push(dateForDay);
            }
          } else {
            recurringDates.push(baseDate);
          }
        }
        break;
  
      case 'monthly':
        for (let i = 0; i < 12; i++) {  // Generate up to 1 year of monthly dates
          const baseDate = addMonths(startDate, i * interval);
          // If nth day is selected, find the correct nth occurrence in the month
          if (nthDay) {
            const { week, day } = nthDay;
            const nthDate = getNthDayOfMonth(baseDate, week, day);  // Calculate nth occurrence
            if (nthDate) {
              recurringDates.push(nthDate);
            }
          } else {
            recurringDates.push(baseDate);
          }
        }
        break;
  
      case 'yearly':
        for (let i = 0; i < 10; i++) {  // Generate up to 10 years of yearly dates
          recurringDates.push(addYears(startDate, i * interval));
        }
        break;
  
      default:
        break;
    }
  
    // If the user has selected an end date, filter out dates beyond it
    if (endDate) {
      return recurringDates.filter(date => date <= endDate);
    }
  
    return recurringDates;
  }

  const recurringDates = generateRecurringDates();

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h3 className="font-semibold mb-4">Date Preview</h3>

      <Calendar
        value={startDate}
        tileClassName={({ date }) =>
          recurringDates.some((d) => d.toDateString() === date.toDateString())
            ? 'bg-blue-500 text-white' // Highlight recurring dates
            : ''
        }
      />
    </div>
  );
};

