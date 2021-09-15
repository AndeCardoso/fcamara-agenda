import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Button, LinkButton } from "../dumb/button";
import Select from '../dumb/select';
import Alerta from '../dumb/alert'

import { useLogged } from '../../context/auth';
import api from '../../services/api';

import './style.css';

const Agenda = () => {
    const [unit, setUnit] = useState('Santos');
    const [events, setEvents] = useState([{
      allDay: true,
      title: '',
      date: '',
      id: ''
    }]);

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
        api.defaults.headers.token = token;
        const response = await api.get('/appoint', local );
        response.data.appoints.map((appoint) => {return setEvents(events => [...events, {
          allDay: true,
          title: appoint.unit,
          date: appoint.ap_date,
          id: appoint._id
        }])});
      }
    };

    const handleEventRemove = async (data) => {
      const id = data.event._def.publicId;
      console.log(id)
      api.defaults.headers.token = token;
      const response = await api.delete("/appoint/"+id);
      if (response.data.message) {
        setAlerta({
          type: "sucess",
          msg: "Agendamento cancelado!"
        });
        window.location.reload();
      } else {
        setAlerta({
          type: "error",
          msg: "Algo deu errado!"
        });
      }
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

    const onLogout = () => {
      Cookies.remove('token');
      setLogged(false);
      history.push('/')
    }
    
    return (
      <div className="wrapper-agenda">
        <h1>AGENDAMENTO</h1>
        <Alerta type={alerta.type}>{alerta.msg}</Alerta>
        <div className="appoint-top">
          <Select label="Unidade:" value={unit} onChange={event => setUnit(event.target.value)} />
        </div>
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          ref={calendarRef}
          events={{events}}
          selectable={true}
          weekends={false}
          locale="pt-br"
          initialView="dayGridMonth"
          eventClick={(event) => handleEventRemove(event)}
          dateClick={(event) => onEventAdded(event)}
          eventColor={'#36357E'}
        />
        <div className="appoint-btns">
          <LinkButton type='button primary' destiny='/updatecadastro'>Editar Cadastro</LinkButton>
          <Button type='button secondary' onClick={onLogout}>Sair</Button>
        </div>
      </div>
    )
};

export default Agenda;