import React from "react";
import { CalendarEvent } from "../../types/calendarTypes";
import { isBefore, parseISO } from "date-fns";
import { getCategoryColor } from "../../utils/calendarUtils";
import { BiCheck } from "react-icons/bi";
import { IoMdWarning } from "react-icons/io";

type EventChipProps = {
  event: CalendarEvent;
};

const EventChip: React.FC<EventChipProps> = ({ event }) => {
  const isPastEvent =
    isBefore(parseISO(event.date), new Date()) && !event.isPaid;

  return (
    <div className="d-flex align-items-center gap-1 mt-1">
      <div
        className={`${
          isPastEvent && "border border-danger"
        } text-capitalize event-chip align-items-center px-2 py-1 rounded-pill text-white ${getCategoryColor(
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
        {isPastEvent && (
          <span className="text-danger me-1">
            <IoMdWarning size={20} />
          </span>
        )}
        <span className="me-1">{event.property}</span>
        <span className="fw-bold me-1">-</span>
        <span className="me-1">{event.category}</span>
        <span>{event.description}</span>
      </div>
      {event.isPaid && (
        <span className="badge border border-success-subtle py-0 rounded-pill d-flex align-items-center">
          <BiCheck className="" size={18} color="green" />
          <small className="text-success">Pagado</small>
        </span>
      )}
    </div>
  );
};

export default EventChip;
