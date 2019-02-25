import React, { Component } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import MeterReadingsService from './services/MeterReadingsService';
import MeterRead from './components/MeterRead';
import { to } from './utils';

class App extends Component {
  constructor(props) {
    super(props);

    const d = new Date();

    this.state = {
      meterReadings: [],
      currentReading: '',
      currentDate: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      errorMessage: '',
      fetchInProgress: false
    };
  }

  async componentDidMount() {
    const [result, err] = await to(MeterReadingsService.getData());
    if (err) {
      console.log(err);
    } else {
      this.setState({ meterReadings: result });
    }
  }

  handleMeterReadChange = event => {
    const newValue = event.target.value;
    if (/^\d{0,5}$/gi.test(newValue)) {
      this.setState({
        currentReading: newValue === '' ? '' : newValue
      });
    }
  };

  handleMeterDateChange = event => {
    const newValue = event.target.value;
    if (/(\d-)*/gi.test(newValue)) {
      this.setState({
        currentDate: newValue === '' ? '' : newValue
      });
    }
  };

  handleMeterReadClick = async () => {
    this.setState({
      fetchInProgress: true
    });

    const date = new Date(this.state.currentDate);

    const [result, err] = await to(
      MeterReadingsService.updateData(this.state.currentReading, date.toISOString())
    );
    if (err) {
      console.log(err);
    }
    if (result && result.err) {
      this.setState({
        errorMessage: result.err,
        fetchInProgress: false
      });
    } else {
      const meterReadings = await MeterReadingsService.getData();
      this.setState({
        errorMessage: result.err,
        fetchInProgress: false,
        meterReadings
      });
    }
  };

  render() {
    const {
      meterReadings,
      currentReading,
      currentDate,
      errorMessage,
      fetchInProgress
    } = this.state;

    const energyUsageData = [];
    for (let i = 1; i < meterReadings.length - 2; i += 1) {
      const prevReading = meterReadings[i + 1].estimation || meterReadings[i + 1].cumulative;
      const currentReading = meterReadings[i].estimation || meterReadings[i].cumulative;
      const energyUsage = prevReading - currentReading;
      energyUsageData.push({
        date: meterReadings[i + 1].readingDate,
        energyUsage
      });
    }

    const format = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const meterReadingsRows = meterReadings.map(reading => {
      return (
        <tr key={reading.readingDate}>
          <td>{format(new Date(reading.readingDate))}</td>
          <td>{reading.cumulative}</td>
          <td>{reading.estimation || '-'}</td>
          <td>{reading.unit}</td>
        </tr>
      );
    });

    return (
      <div>
        <h2>Energy Usage</h2>
        <BarChart width={1400} height={400} data={energyUsageData}>
          <XAxis dataKey="date" />
          <YAxis dataKey="energyUsage" />
          <CartesianGrid horizontal={false} />
          <Tooltip />
          <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
        </BarChart>
        <h2>Meter Readings</h2>
        <MeterRead
          onReadingChange={this.handleMeterReadChange}
          onDateChange={this.handleMeterDateChange}
          onClick={this.handleMeterReadClick}
          currentReading={currentReading}
          currentDate={currentDate}
          errorMessage={errorMessage}
          fetchInProgress={fetchInProgress}
        />
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Reading</th>
              <th>Estimated (End of month)</th>
              <th>Unit</th>
            </tr>
            {meterReadingsRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
