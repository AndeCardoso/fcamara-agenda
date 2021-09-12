import { useState, useEffect, useRef } from 'react';
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
    const [marcar, setMarcar] = useState([{}]);
    const [title, setTitle] = useState('Agendado!')
    const { logged, setLogged } = useLogged();
    const calendarRef = useRef(null);
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
        console.log(response.data.appoints)
        setEvents(response.data.appoints);
      }
    };

    const handleEventRemove = (data) => {
      let calendarApi = calendarRef.current.getApi();
      const date = data.event._instance.range.end;      
    }

    const onEventAdded = async (event) => {
      const data = {
        unit: "São Paulo",
        ap_date: event.date
      }
      api.defaults.headers.token = token;
      const response = await api.post("/appoint", data)
      let calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
          allDay: true,
          date: data.ap_date,
          title: data.unit,
      });
    };
    
    // const onClick = async () => {
    //   console.log(daysReserved)
    //   const data = {
    //     unit: "Rio de Janeiro",
    //     ap_date: daysReserved.date
    //   }
    //   api.defaults.headers.authorization = token;
    //   const response = await api.post("/appoint", data);
    //   console.log('respostas '+response)
    // }

    const handleDatesSet = async (data) => {
      const unidade = { unit: 'São Paulo' };
      api.defaults.headers.authorization = token;
      const response = api.get("/appoint", unidade)
      setEvents(response.data);
    }

    return (
      <div>
        
        {/* <Button type='save' destiny='' onClick={onClick} >Agendar</Button> */}
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          ref={calendarRef}
          events={events}
          selectable={true}
          editable={true}
          weekends={false}
          locale="pt-br"
          initialView="dayGridMonth"
          eventClick={(event) => handleEventRemove(event)}
          datesSet={(date) => handleDatesSet(date)}
          // eventAdd={(event) => handleEventAdd(event)}
          dateClick={(event) => onEventAdded(event)}
        />
      </div>
    )
};

export default Agenda;