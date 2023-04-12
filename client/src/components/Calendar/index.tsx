import React, { useEffect, useState } from 'react';

function Calendar() {
  const [data, setData] = useState<EventData[] | []>([]);

  interface EventData {
    id: number;
    name: string;
  }

  useEffect(() => {
    fetch('https://localhost:8080/api/events')
      .then(response => response.json())
      .then((data: EventData[]) => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default Calendar;