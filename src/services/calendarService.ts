import { CalendarEvent, NewCalendarEvent } from '../types/calendarTypes';
import apiClient from './apiClient';

export const getAllEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const response = await apiClient.get<CalendarEvent[]>(`/calendar/events`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch calendar events`);
  }
};

/* export const getEventsByMonth = async (year: number, month: number): Promise<CalendarEvent[]> => {
  try {
    const response = await apiClient.get<CalendarEvent[]>(`/calendar/events/month`, {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch events for ${year}-${month}`);
  }
}; */

export const getEventsByDate = async (date: string): Promise<CalendarEvent[]> => {
  try {
    const response = await apiClient.get<CalendarEvent[]>(`/calendar/events/getByDate/${date}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch events for date: ${date}`);
  }
};

export const getEventById = async (id: string): Promise<CalendarEvent> => {
  try {
    const response = await apiClient.get<CalendarEvent>(`/calendar/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch event with ID: ${id}`);
  }
};

export const createEvent = async (event: Omit<CalendarEvent, '_id'>): Promise<CalendarEvent> => {
  try {
    const response = await apiClient.post<CalendarEvent>('/calendar/events', event);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create calendar event');
  }
};

export const updateEventIsPaid = async (id: string, data: Partial<CalendarEvent>) => {
  const response = await apiClient.put(`/calendar/events/updateIsPaid/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete(`/calendar/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete event with ID: ${id}`);
  }
};
