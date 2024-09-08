import React from "react";
import { format, differenceInDays, parseISO } from "date-fns";
import { CalendarEvent } from "../../types/calendarTypes";
import { BiCheck } from "react-icons/bi";
import { getCategoryColor } from "../../utils/calendarUtils";

type HighlightedEventsProps = {
  highlightedEvents: Record<string, CalendarEvent[]>;
  onEventClick: (event: CalendarEvent) => void;
};

const HighlightedEvents: React.FC<HighlightedEventsProps> = ({
  highlightedEvents,
  onEventClick,
}) => {
  return (
    <>
      {Object.keys(highlightedEvents).map((dateKey) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onEventClick(highlightedEvents[dateKey][0])}
          key={dateKey}
          className="border shadow-sm border-danger-subtle p-2 mb-2 rounded"
        >
          <strong>{format(parseISO(dateKey), "dd/MM/yyyy")}</strong> -{" "}
          <span className="text-muted">
            Vence en {differenceInDays(parseISO(dateKey), new Date()) + 1}{" "}
            {differenceInDays(parseISO(dateKey), new Date()) + 1 === 1
              ? "día"
              : "días"}
          </span>
          <ul className="list-group mt-1">
            {highlightedEvents[dateKey].map((event) => (
              <li key={event._id} className="mt-2 text-capitalize">
                <div>
                  <span className="p-2  badge badge-pill bg-secondary">
                    {event.property}
                  </span>
                  <span
                    className={`p-2  badge badge-pill ${getCategoryColor(
                      event.category
                    )} ms-2`}
                  >
                    {event.category}
                  </span>
                  {event.isPaid && (
                    <span className="ms-3 badge border border-success-subtle py-0 rounded-pill d-flex align-items-center">
                      <BiCheck className="" size={18} color="green" />
                      <small className="text-success">
                        Pagado -{" "}
                        {`${String(event.payDay).padStart(2, "0")}/${String(
                          event.payMonth
                        ).padStart(2, "0")}/${event.payYear}`}
                      </small>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default HighlightedEvents;
