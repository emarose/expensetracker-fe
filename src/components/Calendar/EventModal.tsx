import React from "react";
import { Modal, Button } from "react-bootstrap";
import { CalendarEvent } from "../../types/calendarTypes";
import EventChip from "./EventChip";

interface EventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDate: Date | null;
  events: CalendarEvent[];
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onRequestClose,
  selectedDate,
  events,
}) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Vencimientos en {selectedDate && selectedDate.toDateString()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {events.length > 0 ? (
          events.map((event) => <EventChip key={event._id} event={event} />)
        ) : (
          <p>Sin vencimientos</p>
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
