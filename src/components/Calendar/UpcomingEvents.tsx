import React, { useEffect, useState } from "react";
import {
  format,
  differenceInDays,
  isBefore,
  addDays,
  isSameDay,
} from "date-fns";
import { CalendarEvent } from "../../types/calendarTypes";
import { getCategoryColor } from "../../utils/calendarUtils";

type UpcomingEventsProps = {
  events: CalendarEvent[];
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const [highlightedEvents, setHighlightedEvents] = useState<CalendarEvent[]>(
    []
  );
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const today = new Date();
    const twoWeeksFromNow = addDays(today, 14);

    const { upcoming, past } = events.reduce(
      (acc, event) => {
        const year = event.year ?? today.getFullYear();
        const month = event.month ?? today.getMonth() + 1;
        const day = event.day ?? today.getDate();

        const eventDate = new Date(year, month - 1, day);
        const isUpcoming =
          isBefore(eventDate, twoWeeksFromNow) &&
          differenceInDays(eventDate, today) >= 0;

        const categorizedEvent = { ...event, date: eventDate };

        if (isUpcoming) {
          acc.upcoming.push(categorizedEvent);
        } else if (differenceInDays(eventDate, today) < 0) {
          acc.past.push(categorizedEvent);
        }

        return acc;
      },
      { upcoming: [] as CalendarEvent[], past: [] as CalendarEvent[] }
    );

    const sortedUpcoming = upcoming.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    if (sortedUpcoming.length > 0) {
      // Group events by the same date as the first event's date
      const firstEventDate = sortedUpcoming[0].date;
      const highlighted = sortedUpcoming.filter((event) =>
        isSameDay(event.date, firstEventDate)
      );
      const remainingEvents = sortedUpcoming.filter(
        (event) => !isSameDay(event.date, firstEventDate)
      );

      setHighlightedEvents(highlighted);
      setUpcomingEvents(remainingEvents);
    } else {
      setHighlightedEvents([]);
      setUpcomingEvents([]);
    }

    setPastEvents(past.sort((a, b) => a.date.getTime() - b.date.getTime()));
  }, [events]);

  return (
    <div className="card p-3">
      <h5>Próximos Vencimientos:</h5>

      {highlightedEvents.length > 0 && (
        <div>
          {highlightedEvents.map((event) => (
            <div
              key={event._id}
              className="list-group-item d-flex justify-content-between align-items-center border border-danger p-2"
              style={{
                marginBottom: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div>
                <strong>{format(new Date(event.date), "dd/MM/yyyy")}</strong>{" "}
                {event.description} -{" "}
                <span className="text-muted">
                  Vence en {differenceInDays(new Date(event.date), new Date())}{" "}
                  días
                </span>
                <div className="mt-1">
                  <span
                    className={`badge badge-pill ${getCategoryColor(
                      event.category
                    )} me-2`}
                  >
                    {event.category}
                  </span>
                  <span className="badge badge-pill bg-secondary">
                    {event.property}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ul className="list-group">
        {upcomingEvents.map((event) => (
          <li
            key={event._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{format(new Date(event.date), "dd/MM/yyyy")}</strong>{" "}
              {event.description} -{" "}
              <span className="text-muted">
                Vence en {differenceInDays(new Date(event.date), new Date())}{" "}
                días
              </span>
              <div className="mt-1">
                <span
                  className={`badge badge-pill ${getCategoryColor(
                    event.category
                  )} me-2`}
                >
                  {event.category}
                </span>
                <span className="badge badge-pill bg-secondary">
                  {event.property}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {pastEvents.length > 0 && (
        <>
          <h5 className="mt-4 text-danger">Fechas Vencidas:</h5>
          <ul className="list-group">
            {pastEvents.map((event) => (
              <li
                key={event._id}
                className="list-group-item d-flex justify-content-between align-items-center bg-danger text-white"
                style={{
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div>
                  <strong>{format(new Date(event.date), "dd/MM/yyyy")}</strong>{" "}
                  {event.description} -{" "}
                  <span>
                    Vencido hace{" "}
                    {Math.abs(
                      differenceInDays(new Date(), new Date(event.date))
                    )}{" "}
                    días
                  </span>
                  <div className="mt-1">
                    <span
                      className={`badge badge-pill ${getCategoryColor(
                        event.category
                      )} me-2`}
                    >
                      {event.category}
                    </span>
                    <span className="badge badge-pill bg-secondary">
                      {event.property}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UpcomingEvents;
