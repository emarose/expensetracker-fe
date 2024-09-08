import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import {
  CalendarEvent,
  EventState,
  EventStates,
} from "../../types/calendarTypes";
import {
  deleteEvent,
  getAllEvents,
  updateEventIsPaid,
} from "../../services/calendarService";
import { format } from "date-fns";

interface EventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDate: Date | null;
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  refreshEvents: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onRequestClose,
  selectedDate,
  events,
  setEvents,
  refreshEvents,
}) => {
  const [eventStates, setEventStates] = useState<EventStates>({});

  useEffect(() => {
    if (events.length > 0) {
      const initialStates: EventStates = events.reduce((acc, event) => {
        acc[event._id] = {
          isPaid: event.isPaid,
          payDate: event.payDate,
          isEditing: false,
          originalState: {
            isPaid: event.isPaid,
            payDate: event.payDate,
          },
        };
        return acc;
      }, {} as EventStates);

      setEventStates(initialStates);
    }
  }, [events]);

  if (!selectedDate) {
    return null;
  }

  const formattedDate = format(selectedDate, "dd/MM/yyyy");

  const handlePaidChange = (eventId: string, value: boolean) => {
    setEventStates((prevState) => ({
      ...prevState,
      [eventId]: {
        ...prevState[eventId],
        isPaid: true,
        payDate: value ? new Date() : null,
      },
    }));
  };

  const handlePayDateChange = (eventId: string, date: Date) => {
    setEventStates((prevState) => ({
      ...prevState,
      [eventId]: {
        ...prevState[eventId],
        payDate: date,
      },
    }));
  };

  const toggleEditing = (eventId: string) => {
    setEventStates((prevState) => ({
      ...prevState,
      [eventId]: {
        ...prevState[eventId],
        isEditing: !prevState[eventId].isEditing,
      },
    }));
  };

  const handleCancel = (eventId: string) => {
    const originalState = eventStates[eventId].originalState;
    setEventStates((prevState) => ({
      ...prevState,
      [eventId]: {
        ...originalState,
        isEditing: false,
      },
    }));
  };

  const handleUpdate = async (event: CalendarEvent) => {
    const { isPaid, payDate } = eventStates[event._id] || {};

    if (payDate !== undefined) {
      try {
        const dateToSend = payDate ? new Date(payDate) : undefined;

        await updateEventIsPaid(event._id, {
          isPaid: true,
          date: dateToSend,
        });

        setEventStates((prevState) => ({
          ...prevState,
          [event._id]: {
            ...prevState[event._id],
            isEditing: false,
            originalState: { isPaid, payDate },
          },
        }));

        refreshEvents(); // Refresh the events after saving

        // Optionally update the events array
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e._id === event._id ? { ...e, isPaid, payDate } : e
          )
        );
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      refreshEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Modal size="xl" show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Vencimientos en {formattedDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {events.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha de Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const { isPaid, payDate, isEditing } = eventStates[
                  event._id
                ] || {
                  isPaid: event.isPaid,
                  payDate: event.payDate,
                  isEditing: false,
                };

                const formattedPayDate = payDate
                  ? `${String(event.payDay).padStart(2, "0")}/${String(
                      event.payMonth
                    ).padStart(2, "0")}/${event.payYear}`
                  : "No asignada";

                return (
                  <tr key={event._id}>
                    <td>{event.property}</td>
                    <td>{event.category}</td>
                    <td>{event.description}</td>
                    <td>{isPaid ? "Pagado" : "No pagado"}</td>{" "}
                    {/* Show isPaid state */}
                    <td>
                      {isEditing ? (
                        <Form.Control
                          type="date"
                          required
                          value={
                            payDate
                              ? new Date(payDate).toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            handlePayDateChange(
                              event._id,
                              new Date(e.target.value)
                            )
                          }
                        />
                      ) : payDate ? (
                        formattedPayDate
                      ) : (
                        "No asignada"
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <>
                          <Button
                            variant="success"
                            onClick={() => handleUpdate(event)}
                            className="me-2"
                          >
                            Guardar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleCancel(event._id)}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          {isPaid ? (
                            <Button
                              variant="warning"
                              onClick={() => toggleEditing(event._id)}
                              className="me-2"
                            >
                              Modificar
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={() => toggleEditing(event._id)}
                            >
                              Pagar
                            </Button>
                          )}
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteEvent(event._id)}
                          >
                            Borrar
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>No hay vencimientos para esta fecha.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
