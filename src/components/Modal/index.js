import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { DateTime } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import PrimaryColorPicker from 'mui-primary-color-picker';

const EventModal = ({
  title,
  isOpen,
  event,
  onCancel,

  currentEvent: state,
  onSubmit,
  buttonSubmitText = 'Submit',
  buttonCancelText = 'Cancel',
  handleEventDataChange,
  handleChangeSwitch,
  handleTitle
}) => {
  const HALF_HOUR = 30;
  const [currentDate, setCurrentDate] = useState(DateTime.now());
  const roundedTime = currentDate.set({
    second: 0,
    millisecond: 0
  });
  const maxDate = currentDate.plus({ years: 1 });

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(state);

    return onCancel();
  };

  useEffect(() => {
    setCurrentDate(DateTime.now());
  }, [state]);

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        aria-labelledby={'modal-dialog-title'}
        aria-describedby={'modal-dialog-description'}
      >
        <Container component={'form'} onSubmit={handleSubmit} disableGutters>
          <DialogTitle id={'modal-dialog-title'}>{title}</DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  autoFocus
                  name={'title'}
                  margin={'dense'}
                  label={'Event name'}
                  autoComplete={'off'}
                  type={'text'}
                  fullWidth
                  variant={'outlined'}
                  value={state.title}
                  onChange={handleTitle}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

              <Grid item sm={12}>
                <Grid container justify={'space-between'} spacing={2}>
                  <Grid item sm={6}>
                    <DateTimePicker
                      openTo={'date'}
                      // format={'dd.MM.yyyy h'}
                      label={'Event start date'}
                      variant={'inline'}
                      inputVariant={'outlined'}
                      views={['year', 'month', 'date']}
                      name={'startDate'}
                      fullWidth
                      margin={'dense'}
                      ampm={false}
                      // minDate={currentDate}
                      // maxDate={maxDate}
                      value={state.start}
                      onChange={handleEventDataChange}
                    />
                  </Grid>

                  <Grid item sm={6}>
                    <DateTimePicker
                      openTo={'date'}
                      ampm={false}
                      label={'Event end date'}
                      variant={'inline'}
                      inputVariant={'outlined'}
                      views={['year', 'month', 'date']}
                      name={'startDate'}
                      fullWidth
                      margin={'dense'}
                      minDate={state.start}
                      // maxDate={maxDate}
                      value={state.end}
                      onChange={handleEventDataChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={12}>
                <FormControlLabel
                  control={<Switch name={'isAllDay'} checked={state.allDay} onChange={handleEventDataChange} />}
                  label={'All day'}
                />
                {/* <Grid sm={12}>
                  <Grid item sm={5}>
                    <PrimaryColorPicker onChange={color => console.log(color)} text={'Background:'} />
                  </Grid>
                  <Grid item sm={5}>
                    <PrimaryColorPicker onChange={color => console.log(color)} text={'Text:'} />
                  </Grid>
                </Grid> */}
              </Grid>

              {/* <Grid item sm={12}>
                <TextField
                  name={'description'}
                  margin={'dense'}
                  label={'Event description'}
                  autoComplete={'off'}
                  placeholder={'Details, reminders, etc.'}
                  type={'text'}
                  fullWidth
                  multiline
                  aria-multiline={'true'}
                  variant={'outlined'}
                  value={state.description}
                  onChange={handleEventDataChange}
                  inputProps={{ maxLength: 2000 }}
                />
              </Grid> */}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={onCancel} color={'primary'}>
              {buttonCancelText}
            </Button>
            <Button type={'submit'} color={'secondary'}>
              {buttonSubmitText}
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

EventModal.propTypes = {
  buttonCancelText: PropTypes.string,
  buttonSubmitText: PropTypes.string,
  currentEvent: PropTypes.any,
  event: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleEventDataChange: PropTypes.func,
  handleChangeSwitch: PropTypes.func,
  handleTitle: PropTypes.func
};

export default EventModal;
