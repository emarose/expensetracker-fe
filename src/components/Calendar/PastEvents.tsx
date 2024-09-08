import React from "react";
import { format, differenceInDays } from "date-fns";
import { CalendarEvent } from "../../types/calendarTypes";
import { getCategoryColor } from "../../utils/calendarUtils";
import { IoMdWarning } from "react-icons/io";
import { BiCheck } from "react-icons/bi";

type PastEventsProps = {
  pastEvents: CalendarEvent[];
};

const PastEvents: React.FC<PastEventsProps> = ({ pastEvents }) => {
  return (
    <>
      <div className="text-danger mt-3 mb-2">
        <span className="d-flex align-items-center gap-2 justify-content-center">
          <IoMdWarning size={20} />
          <h5 className="text-danger m-0">Fechas Vencidas</h5>{" "}
          <IoMdWarning size={20} />
        </span>
      </div>

      <ul className="border-0 list-group">
        {pastEvents.map((event) => (
          <li
            key={event._id}
            className="p-2 shadow-sm d-flex rounded justify-content-between align-items-center bg-danger text-white"
          >
            <div>
              <strong>{format(new Date(event.date), "dd/MM/yyyy")}</strong>{" "}
              {event.description} -{" "}
              <span>
                Vencido hace{" "}
                {Math.abs(differenceInDays(new Date(), new Date(event.date)))}{" "}
                {Math.abs(
                  differenceInDays(new Date(), new Date(event.date))
                ) === 1
                  ? "día"
                  : "días"}
              </span>
              <div className="mt-2 text-capitalize">
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
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PastEvents;
