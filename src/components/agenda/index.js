import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Cookies from 'js-cookie';
import Alerta from '../dumb/alert'
import { useLogged } from '../../context/auth';
import api from '../../services/api';

import './style.css';

const Agenda = () => {
    const [events, setEvents] = useState([{
      allDay: true,
      title: '',
      date: '',
      id: ''
    }]);
    const [unit, setUnit] = useState('São Paulo');
    const [alerta, setAlerta] = useState({ type: '', msg: '' });
    const { logged, setLogged } = useLogged();
    const calendarRef = useRef(null);
    const token = Cookies.get('token');

    let history = useHistory();

    useEffect(()  =>  {
      if(logged) {
        loadAgenda();
      } else {
        history.push('/');
      }
    }, []);

    const loadAgenda = async () => {
      if (token) {
        const local = { unit: unit };
        api.defaults.headers.authorization = token;
        const response = await api.get('/appoint', local );
        response.data.appoints.map((appoint) => {return setEvents(events => [...events, {
          allDay: true,
          title: appoint.unit,
          date: appoint.ap_date,
          id: appoint._id
        }])});
        console.log(events)
      }
    };

    const handleEventRemove = async (data) => {
      console.log(data)
      api.defaults.headers.token = token;
      const response = await api.delete("/appoint", data);   
    }

    const onEventAdded = async (event) => {
      const data = {
        unit: unit,
        ap_date: event.date
      }
      api.defaults.headers.token = token;
      const response = await api.post("/appoint", data)
      if (response) {
        setAlerta({
          type: "error",
          msg: "Agendamento repetido!"
        })
      }
      let calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
          allDay: true,
          date: data.ap_date,
          title: data.unit,
          id: response.data.appoint._id
      });
    };
    
    const handleDatesSet = async () => {
      const unidade = { unit: unit };
      api.defaults.headers.authorization = token;
      const response = api.get("/appoint", unidade)
    }

    return (
      <div className="agenda">
        <Alerta type={alerta.type}>{alerta.msg}</Alerta>
        <select value={unit} onChange={event => setUnit(event.target.value)} >
          <option value="São Paulo">São Paulo</option>
          <option value="Santos">Santos</option>
        </select>

        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          ref={calendarRef}
          events={{events}}
          selectable={true}
          weekends={false}
          editable={(event) => handleEventRemove(event)}
          locale="pt-br"
          initialView="dayGridMonth"
          eventClick={(event) => handleEventRemove(event)}
          datesSet={(date) => handleDatesSet(date)}
          dateClick={(event) => onEventAdded(event)}
        />
      </div>
    )
};

export default Agenda;