import {create} from 'zustand';

interface DatePickerState {
  startDate: Date | null;
  endDate: Date | null;
  recurrence: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // For "every X days/weeks/months/years"
  daysOfWeek: number[]; // Array for specific days of the week (e.g., [0, 1] for Sunday, Monday)
  nthDay: { week: number, day: number } | null; // nth day of the month (e.g., {week: 2, day: 2} for the second Tuesday)
  updateStartDate: (date: Date) => void;
  updateEndDate: (date: Date | null) => void;
  updateRecurrence: (recurrence: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
  updateInterval: (interval: number) => void;
  updateDaysOfWeek: (days: number[]) => void;
  updateNthDay: (nthDay: { week: number, day: number }) => void;
}

export const useDatePickerStore = create<DatePickerState>((set) => ({
  startDate: null,
  endDate: null,
  recurrence: 'daily',
  interval: 1,
  daysOfWeek: [],
  nthDay: null,
  updateStartDate: (date) => set({ startDate: date }),
  updateEndDate: (date) => set({ endDate: date }),
  updateRecurrence: (recurrence) => set({ recurrence }),
  updateInterval: (interval) => set({ interval }),
  updateDaysOfWeek: (days) => set({ daysOfWeek: days }),
  updateNthDay: (nthDay) => set({ nthDay }),
}));
