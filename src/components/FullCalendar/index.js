import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Typography from '@material-ui/core/Typography';
import './index.css';
import Modal from 'components/Modal';
import { themeColors } from 'app/theme';
import DrawerCalendar from './components/Drawer';
import shortid from 'shortid';

const ManagementCalendar = () => {
  const [state, setState] = useState({
    weekendVisible: true,
    sideBarIsOpen: false,
    modalDeleteEventIsOpen: false,
    modalSelectEventIsOpen: false,
    modalEditEventIsOpen: false,
    modalEventTitleSelectIsOpen: false
  });
  const [currentEvents, setCurrentEvents] = useState([]);

  const [currentEvent, setCurrentEvent] = useState({
    title: '',
    allDay: false,
    end: '',
    start: '',
    id: 1,
    backgroundColor: themeColors.main.primary,
    textColor: '#000'
  });
  const [stateCalendar, setStateCalendar] = useState('');

  console.log(currentEvents);

  const handleTitle = ({ target: { value } }) => setCurrentEvent(state => ({ ...state, title: value }));

  const handleEventContent = ({ timeText, event: { title, allDay, backgroundColor, textColor, borderColor } }) => {
    return (
      <>
        <Typography>{timeText}</Typography>
        {allDay ? <Typography variant={'button'}>{'Event for all day'}</Typography> : null}
        <Typography>{title}</Typography>
      </>
    );
  };
  // const handleState = (name, value) => setState(state => ({ ...state, [name]: value }));

  console.log(currentEvent);

  const handleEventModalDeleteClick = ({ event: { remove, title } }) =>
    setState(state => ({ ...state, currentEventSelectClick: { remove, title }, modalDeleteEventIsOpen: true }));

  const handleEventModalDeleteCancel = () => setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  const handleEventModalEditCancel = () => setState(state => ({ ...state, modalEditEventIsOpen: false }));

  const handleEventModalDeleteSubmit = () => {
    setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  };
  const handleEventModalEditSubmit = () => {
    setState(state => ({ ...state, modalDeleteEventIsOpen: false }));
  };

  // console.log();

  const handleEventModalEditClick = e => {
    // console.log(getCurrentData());
    // setStart(100000);
    console.log(e.view.getCurrentData());
    setState(state => ({ ...state, modalEditEventIsOpen: true }));
  };
  const handleEventModalSelectClick = ({ view: { calendar }, startStr: start, endStr: end, allDay }) => {
    setState(state => ({ ...state, modalSelectEventIsOpen: true }));
    setCurrentEvent(state => ({ ...state, start, end, allDay }));
    setStateCalendar(calendar);
  };

  const handleEventModalSelectSubmit = () => {
    const { title, start, end, allDay, backgroundColor, textColor } = currentEvent;

    if (currentEvent.title)
      stateCalendar.addEvent({
        id: shortid(),
        title,
        start,
        end,
        backgroundColor,
        textColor,
        allDay
      });

    setState(state => ({
      ...state,
      modalSelectEventIsOpen: false,
      currentEventSelectClick: { ...state.currentEventSelectClick, title: '' }
    }));
  };

  const handleChangeSwitch = ({ target: { name, checked } }) =>
    setCurrentEvent(state => ({ ...state, [name]: checked }));

  const handleEventDataChange = (name, value) => setCurrentEvent(state => ({ ...state, [name]: value }));

  const handleEventModalSelectCancel = () => setState(state => ({ ...state, modalSelectEventIsOpen: false }));

  const handleSideBarOpen = () => setState(state => ({ ...state, sideBarIsOpen: !state.sideBarIsOpen }));
  const handleEventsSet = events => setCurrentEvents(events);
  const handleWeekendVisible = () => setState(state => ({ ...state, weekendVisible: !state.weekendVisible }));

  const modalGropeArr = [
    {
      isOpen: state.modalSelectEventIsOpen,
      onCancel: handleEventModalSelectCancel,
      onSubmit: handleEventModalSelectSubmit,
      title: 'Please create event!'
      // buttonSubmitText: 'S'
    }
  ];

  return (
    <page className={'management-calendar'}>
      <DrawerCalendar
        handleWeekendVisible={handleWeekendVisible}
        sideBarIsOpen={state.sideBarIsOpen}
        weekendVisible={state.weekendVisible}
        currentEvents={currentEvents}
        handleSideBarOpen={handleSideBarOpen}
      />
      {modalGropeArr.map((props, idx) => (
        <Modal
          {...props}
          handleTitle={handleTitle}
          key={idx}
          handleEventModalSelectSubmit={handleEventModalSelectSubmit}
          currentEvent={currentEvent}
          handleEventDataChange={handleEventDataChange}
          handleChangeSwitch={handleChangeSwitch}
        />
      ))}
      <div className={state.sideBarIsOpen ? 'management-calendar--blur ' : ''}></div>
      <main
        className={
          state.sideBarIsOpen ? 'management-calendar-main--blur management-calendar-main ' : 'management-calendar-main'
        }
      >
        <section className={'management-calendar-main'}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            customButtons={{
              myCustomButton: {
                text: 'Menu',
                click: handleSideBarOpen
              }
            }}
            headerToolbar={{
              left: 'myCustomButton prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView={'dayGridMonth'}
            editable={!true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={state.weekendVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleEventModalSelectClick}
            eventContent={handleEventContent} // custom render function
            eventClick={handleEventModalEditClick}
            eventsSet={handleEventsSet} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventRemove={function(){}}
            */
            eventChange={() => alert('changed')}
            // eventBackgroundColor={'#000'}
            eventBorderColor={'transparent'}
            // eventTextColor={themeColors.main.primary}
            eventColor={themeColors.main.secondary}
          />
        </section>
      </main>
    </page>
  );
};

export default ManagementCalendar;
