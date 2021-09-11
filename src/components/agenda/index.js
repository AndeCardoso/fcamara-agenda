import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import isLogged from '../../services/isLogged';
import Button from '../dumb/button'
import api from '../../services/api';

import './style.css';

const Agenda = () => {
    const [events, setEvents] = useState([]);
    const [marcar, setMarcar] = useState(undefined);
    const daysReserved = [];
    const token = sessionStorage.getItem('token-login');
    let history = useHistory();

    useEffect(()  =>  {
      if(isLogged) {
        loadAgenda();
      } else {
        history.push('/');
      }
    }, []);

    const loadAgenda = async () => {
      if (sessionStorage.getItem('login-token')) {
        const unidade = { unit: 'Santos' };
        api.defaults.headers.authorization = token;
        const response = await api.get('/appoint', unidade );
        setEvents(response);
      }
    };

    const onClick = () => {
      const save = daysReserved;
    }

    const dateClick = (value) => {
      const date = value.dateStr;

      daysReserved.push({ day: date });
      console.log(daysReserved)

        // setDate((prevValue) => ({ ...prevValue, value }));

        // if (value.dayEl.dateStr == date.map) {
        //     value.dayEl.style.backgroundColor = 'blue';
        // } else {
        //     return value.dayEl.style.backgroundColor = 'orange';
        // }
    }

    return (
      <div>
        <Button type='save' destiny='' onClick={onClick} >Agendar</Button>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          events={events}
          initialView="dayGridMonth"
          dateClick={dateClick}
          // event={marcar}
        />
      </div>
    )
};

export default Agenda;