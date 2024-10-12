import { React, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, IconButton, Toolbar } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function CalendarPage(props) {
  const calendarRef = useRef(null);

  function renderEvent(event) {
    return <p className="bg-blue-100 p-1">{event.event.title}</p>;
  }

  function next() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.next();
  }

  function prev() {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prev();
  }

  const events = [{ title: "sleep Early", date: "2024-10-12" }];

  return (
    <div className="p-8 w-full">
      <Toolbar>
        <IconButton onClick={prev}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={next}>
          <NavigateNextIcon />
        </IconButton>
      </Toolbar>
      <FullCalendar
        ref={calendarRef}
        selectable={true}
        editable={true}
        headerToolbar={false}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEvent}
      />
    </div>
  );
}

export default CalendarPage;
