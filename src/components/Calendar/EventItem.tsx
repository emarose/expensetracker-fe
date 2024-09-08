import React from "react";
import { CalendarEvent } from "../../types/calendarTypes";
import { getCategoryColor } from "../../utils/calendarUtils";

type EventItemProps = {
  event: CalendarEvent;
};

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <li className="mt-2 text-capitalize">
      <div>
        {event.description}
        <div className="mt-1">
          <span className="p-2 badge badge-pill bg-secondary">
            {event.property}
          </span>
          <span
            className={` p-2 badge badge-pill ${getCategoryColor(
              event.category
            )} ms-2`}
          >
            {event.category}
          </span>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
