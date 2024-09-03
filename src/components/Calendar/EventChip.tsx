import React from "react";
import { CalendarEvent } from "../../types/calendarTypes";
import { isBefore, parseISO } from "date-fns";
import { getCategoryColor } from "../../utils/calendarUtils";

type EventChipProps = {
  event: CalendarEvent;
};

const EventChip: React.FC<EventChipProps> = ({ event }) => {
  const isPastEvent = isBefore(parseISO(event.date), new Date());

  return (
    <div
      className={`event-chip mb-1 d-inline-flex align-items-center px-2 py-1 rounded-pill text-white ${getCategoryColor(
        event.category
      )}`}
      style={{
        fontSize: "0.75rem",
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      <span className="fw-bold me-1">•</span>
      {isPastEvent && <span className="text-danger me-1">!</span>}
      <span className="me-1">{event.property}</span>
      <span className="fw-bold me-1">-</span>
      <span className="me-1">{event.category}</span>
      <span>{event.description}</span>
    </div>
  );
};

export default EventChip;
