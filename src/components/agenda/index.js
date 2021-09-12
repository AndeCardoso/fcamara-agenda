import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Cookies from 'js-cookie';
import Button from '../dumb/button'
import { useLogged } from '../../context/auth';
import api from '../../services/api';

import './style.css';

const Agenda = () => {
    const [events, setEvents] = useState([]);
    const [marcar, setMarcar] = useState(undefined);
    const { logged, setLogged } = useLogged();
    const token = Cookies.get('token');

    let history = useHistory();
    const daysReserved = [];

    useEffect(()  =>  {
      if(logged) {
        loadAgenda();
      } else {
        history.push('/');
      }
    }, []);

    const loadAgenda = async () => {
      if (token) {
        const unidade = { unit: 'São Paulo' };
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
    }

    return (
      <div>
        <Button type='save' destiny='' onClick={onClick} >Agendar</Button>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          events={events}
          initialView="dayGridMonth"
          dateClick={dateClick}
        />
      </div>
    )
};

export default Agenda;