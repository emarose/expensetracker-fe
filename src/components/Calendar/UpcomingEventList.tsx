import React from "react";
import { format, differenceInDays, parseISO } from "date-fns";
import { CalendarEvent } from "../../types/calendarTypes";
import EventItem from "./EventItem";

type UpcomingEventListProps = {
  upcomingEvents: Record<string, CalendarEvent[]>;
  onEventClick: (event: CalendarEvent) => void;
};

const UpcomingEventList: React.FC<UpcomingEventListProps> = ({
  upcomingEvents,
  onEventClick,
}) => {
  return (
    <ul className="list-group border-0">
      {Object.keys(upcomingEvents).map((dateKey) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onEventClick(upcomingEvents[dateKey][0])}
          key={dateKey}
          className="border p-2 mb-2 rounded"
        >
          <strong>{format(parseISO(dateKey), "dd/MM/yyyy")}</strong> -{" "}
          <span className="text-muted">
            Vence en {differenceInDays(parseISO(dateKey), new Date()) + 1}{" "}
            {differenceInDays(parseISO(dateKey), new Date()) + 1 === 1
              ? "día"
              : "días"}
          </span>
          <ul className="list-group">
            {upcomingEvents[dateKey].map((event) => (
              <EventItem key={event._id} event={event} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default UpcomingEventList;
