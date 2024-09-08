export interface NewCalendarEvent {
  date: Date;
  year?: number;
  month?: number;
  day?: number;
  description: string;
  category: string;
  property: string;
  expenseIds?: string[];
  isPaid: boolean;
  payDate?: Date | null;
  payYear?: number;
  payMonth?: number;
  payDay?: number;
}

export interface CalendarEvent extends NewCalendarEvent {
  _id: string;
  date: Date;
}

export interface Event {
  _id: string;
  isPaid: boolean;
  payDate: Date | null;
}

export interface EventState {
  isPaid: boolean;
  payDate: Date | null;
  isEditing: boolean;
  originalState: {
    isPaid: boolean;
    payDate: Date | null;
  };
}

export interface EventStates {
  [key: string]: EventState;
}