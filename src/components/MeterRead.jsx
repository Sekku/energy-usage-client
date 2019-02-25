import React from 'react';
import PropTypes from 'prop-types';
import MeterReadStyles from './MeterReadStyles';
import { isNumeric, isValidDate } from '../utils';

const MeterRead = ({
  onReadingChange,
  onDateChange,
  onClick,
  currentReading,
  currentDate,
  errorMessage,
  fetchInProgress
}) => {
  const inputReadingId = 'input-reading-id';
  const inputDateId = 'input-date-id';
  let error = null;
  if (errorMessage) {
    error = <MeterReadStyles.ErrorMessage>{errorMessage}</MeterReadStyles.ErrorMessage>;
  }

  let buttonDisabled = !(isNumeric(currentReading) && isValidDate(currentDate));
  buttonDisabled = buttonDisabled || fetchInProgress;

  return (
    <MeterReadStyles.Container>
      <MeterReadStyles.Box>
        <MeterReadStyles.Label htmlFor={inputReadingId}>New reading:</MeterReadStyles.Label>
        <MeterReadStyles.Input
          id={inputReadingId}
          type="text"
          onChange={onReadingChange}
          value={currentReading}
          placeholder="Reading..."
        />
        <MeterReadStyles.Hint>
          Please, introduce the 5 digits number that you can see on your meter
        </MeterReadStyles.Hint>
      </MeterReadStyles.Box>
      <MeterReadStyles.Box>
        <MeterReadStyles.Label htmlFor={inputDateId}>Date of the reading:</MeterReadStyles.Label>
        <MeterReadStyles.Input
          id={inputDateId}
          type="text"
          onChange={onDateChange}
          value={currentDate}
          placeholder="yyyy-mm-dd"
        />
      </MeterReadStyles.Box>
      {error}
      <MeterReadStyles.Button
        type="button"
        onClick={onClick}
        disabled={buttonDisabled}
        className={buttonDisabled ? 'disabled' : ''}
      >
        Send
      </MeterReadStyles.Button>
    </MeterReadStyles.Container>
  );
};

MeterRead.propTypes = {
  onClick: PropTypes.func.isRequired,
  onReadingChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  currentReading: PropTypes.string.isRequired,
  currentDate: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  fetchInProgress: PropTypes.bool.isRequired
};

MeterRead.defaultProps = {
  errorMessage: ''
};

export default MeterRead;
