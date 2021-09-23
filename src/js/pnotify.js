import { info, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export const PNotifyEmptyInput = () => alert({
    text: 'Please enter something!',
    delay: 2000,
});

export const PNotifyError = () => error({
  title: 'Error!',
  text: 'This query does not exist!',
  delay: 2000
});

export const PNotifyForCountry = () => info({
  text: 'Sorry, but we haven not found any events for your request',
  delay: 2000
});

