import { to } from '../utils';

class MeterReadingsService {
  static async getData(start, end) {
    let queryString = '';
    if (start) {
      queryString = `?start=${start.toISOString()}`;
    }
    if (end) {
      queryString = queryString
        ? `${queryString}&end=${end.toISOString()}`
        : `?end=${end.toISOString()}`;
    }
    const [results, err] = await to(
      fetch(`http://localhost:3000/readings${queryString}`).then(r => {
        if (!r.ok) {
          throw new Error('Fail');
        }
        return r.json();
      })
    );
    if (err) {
      throw err;
    }
    // I'm not sure why I receive an 2 elements array, first element is the actual data and the second one is null or undefined
    // Maybe I'm doing something wrong with koa?
    return results[0];
  }

  static async updateData(newReading, newDate) {
    const [result, err] = await to(
      fetch(`http://localhost:3000/readings`, {
        method: 'POST',
        body: JSON.stringify({
          newReading,
          date: newDate
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(r => {
        if (!r.ok) {
          throw new Error(`${r.statusText} (${r.status})`);
        }
        return r.json();
      })
    );

    if (err) {
      throw err;
    }
    return result;
  }
}

export default MeterReadingsService;
