import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import { useState } from 'react';

import './style.css';

const Agenda = () => {
    const [date, setDate] = useState([]);
    const [marcar, setMarcar] = useState(undefined);

    const dateClick = (value) => {
        console.log(value)
        setDate((prevValue) => ({ ...prevValue, value }));

        if (value.dayEl.dateStr == date.map) {
            value.dayEl.style.backgroundColor = 'blue';
        } else {
            return value.dayEl.style.backgroundColor = 'orange';
        }
        // setMarcar = { title: 'Agendado pra fulano', date: value.dateStr};
        console.log(date.values)
    }

    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        dateClick={dateClick}
        // event={marcar}
      />
    )
};

export default Agenda;