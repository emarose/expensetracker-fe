import React, { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  getYear,
  getMonth,
  getDate,
} from "date-fns";
import { es } from "date-fns/locale";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { getEventsByDate } from "../../services/calendarService";
import { CalendarEvent } from "../../types/calendarTypes";
import EventModal from "./EventModal";
import EventForm from "./EventForm";
import EventChip from "./EventChip";
import UpcomingEvents from "./UpcomingEvents";
import "./style.css";

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  const fetchEvents = async () => {
    try {
      const year = getYear(currentMonth);
      const month = getMonth(currentMonth) + 1;

      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(startDate);
      let events: CalendarEvent[] = [];

      for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
        const fetchedEvents = await getEventsByDate(format(date, "yyyy-MM-dd"));
        events = events.concat(fetchedEvents);
      }

      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="rounded d-flex justify-content-between align-items-center p-3 bg-dark text-white">
        <button className="btn btn-light" onClick={prevMonth}>
          <GoChevronLeft />
        </button>
        <span className="h4 m-0 text-capitalize">
          {format(currentMonth, dateFormat, { locale: es })}
        </span>
        <button className="btn btn-light" onClick={nextMonth}>
          <GoChevronRight />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentMonth, { locale: es });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col text-center py-2" key={i}>
          {format(addDays(startDate, i), dateFormat, { locale: es })}
        </div>
      );
    }

    return <div className="row py-2 border-bottom text-capitalize">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: es });
    const endDate = endOfWeek(monthEnd, { locale: es });

    const rows = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayDate = getDate(day);
        const dayMonth = getMonth(day) + 1;
        const dayYear = getYear(day);
        const cloneDay = day;

        days.push(
          <div
            style={{ minHeight: 100 }}
            className={`col border position-relative ${
              !isSameMonth(day, monthStart)
                ? "bg-dark-subtle"
                : isSameDay(day, new Date())
                ? "bg-primary-subtle"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{format(day, "d")}</span>
            <div className="events-container mt-2">
              {events
                .filter(
                  (event) =>
                    event.day === dayDate &&
                    event.month === dayMonth &&
                    event.year === dayYear
                )
                .map((event) => (
                  <div key={event._id}>
                    <EventChip event={event} />
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };
  return (
    <>
      <div className="container gap-5 my-4 d-flex">
        <div className="col">
          <EventForm onEventAdded={fetchEvents} />
        </div>
        <div className="col">
          <UpcomingEvents events={events} />
        </div>
      </div>
      <div className="container calendar mb-5">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        <EventModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          selectedDate={selectedDate}
          events={events.filter(
            (event) =>
              selectedDate &&
              event.day === getDate(selectedDate) &&
              event.month === getMonth(selectedDate) + 1 &&
              event.year === getYear(selectedDate)
          )}
        />
      </div>
    </>
  );
};

export default Calendar;
