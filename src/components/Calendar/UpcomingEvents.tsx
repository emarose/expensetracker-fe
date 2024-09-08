import React, { useEffect, useState } from "react";
import {
  addDays,
  differenceInDays,
  getDate,
  getMonth,
  getYear,
} from "date-fns";
import { CalendarEvent } from "../../types/calendarTypes";
import HighlightedEvents from "./HighlightedEvents";
import UpcomingEventList from "./UpcomingEventList";
import PastEvents from "./PastEvents";
import EventModal from "./EventModal";

type UpcomingEventsProps = {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  refreshEvents: () => void;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events,
  setEvents,
  refreshEvents,
}) => {
  const [highlightedEvents, setHighlightedEvents] = useState<
    Record<string, CalendarEvent[]>
  >({});
  const [upcomingEvents, setUpcomingEvents] = useState<
    Record<string, CalendarEvent[]>
  >({});
  const [pastEvents, setPastEvents] = useState<CalendarEvent[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  useEffect(() => {
    const today = new Date();
    const twoWeeksFromNow = addDays(today, 18);

    const highlightedThreshold = 5;

    const { highlighted, upcoming, past } = events.reduce(
      (acc, event) => {
        const year = event.year ?? today.getFullYear();
        const month = event.month ?? today.getMonth() + 1;
        const day = event.day ?? today.getDate();

        const eventDate = new Date(year, month - 1, day);
        const daysUntilEvent = differenceInDays(eventDate, today);

        const categorizedEvent = { ...event, date: eventDate };

        if (daysUntilEvent < 0) {
          acc.past.push(categorizedEvent);
        } else if (daysUntilEvent <= highlightedThreshold) {
          const dateKey = eventDate.toISOString().split("T")[0];
          if (!acc.highlighted[dateKey]) {
            acc.highlighted[dateKey] = [];
          }
          acc.highlighted[dateKey].push(categorizedEvent);
        } else if (daysUntilEvent <= 30) {
          const dateKey = eventDate.toISOString().split("T")[0];
          if (!acc.upcoming[dateKey]) {
            acc.upcoming[dateKey] = [];
          }
          acc.upcoming[dateKey].push(categorizedEvent);
        }

        return acc;
      },
      {
        highlighted: {} as Record<string, CalendarEvent[]>,
        upcoming: {} as Record<string, CalendarEvent[]>,
        past: [] as CalendarEvent[],
      }
    );

    setHighlightedEvents(highlighted);
    setUpcomingEvents(upcoming);
    setPastEvents(past.sort((a, b) => a.date.getTime() - b.date.getTime()));
  }, [events]);

  const openModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="card p-3">
        <h5 className="text-center">Próximos Vencimientos</h5>
        <HighlightedEvents
          highlightedEvents={highlightedEvents}
          onEventClick={openModal}
        />
        <UpcomingEventList
          upcomingEvents={upcomingEvents}
          onEventClick={openModal}
        />
        {pastEvents.length > 0 && <PastEvents pastEvents={pastEvents} />}
      </div>
      {selectedEvent && (
        <EventModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          selectedDate={selectedEvent.date}
          refreshEvents={refreshEvents}
          setEvents={setEvents}
          events={events.filter(
            (event) =>
              selectedEvent &&
              event.day === getDate(selectedEvent.date) &&
              event.month === getMonth(selectedEvent.date) + 1 &&
              event.year === getYear(selectedEvent.date)
          )}
        />
      )}
    </>
  );
};

export default UpcomingEvents;
