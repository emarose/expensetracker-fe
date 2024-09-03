// For creating an event (without _id)
export interface NewCalendarEvent {
  date: Date;
  year?: number;
  month?: number;
  day?: number;
  description: string;
  category: string
  property: string;
  expenseIds?: string[];
}

// For receiving an event (with _id)
export interface CalendarEvent extends NewCalendarEvent {
  _id: string;
  date: Date;
}
