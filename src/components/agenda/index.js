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
    // const events = [{
    //   allDay: 'true',
    //   title: 'SP',
    //   date: '2021-09-01T03:00:00.000Z',
    //   id: '613e46ad70bd72ba3d3c02cf'
    // },
    // {allDay: 'true',
    // title: 'SP',
    // date: '2021-09-10T03:00:00.000Z',
    // id: '613e46ad70bd72ba3d3c02ch'}]

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
        const local = { unit: unit };
        api.defaults.headers.authorization = token;
        const response = await api.get('/appoint', local );
        let eventos = response.data.appoints.map(function(evento){return evento});
        setEvents([{
          title: eventos.unit,
          date: eventos.ap_date,
          id: eventos._id
        }]);
        console.log(response)
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
      // let evento = response.data.appoints.map(function(evento){return evento});

      // setEvents([{
      //   title: local,
      //   date: dia,
      //   id: id
      // }])
      return response;
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