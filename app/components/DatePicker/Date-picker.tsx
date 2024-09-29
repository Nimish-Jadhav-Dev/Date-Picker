"use client"
import { RecurrenceOptions } from './Recurrence-options';
import { DatePreview } from './Date-preview';
import { useDatePickerStore } from '../../state_management/date-store';
import { format } from 'date-fns';

export const DatePicker = () => {
  const { startDate, updateStartDate, updateEndDate } = useDatePickerStore();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEndDate(new Date(e.target.value));
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Date Picker</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
            onChange={handleStartDateChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">End Date</label>
          <input
            type="date"
            onChange={handleEndDateChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <RecurrenceOptions />
        <DatePreview />
      </div>
    </div>
  );
};
