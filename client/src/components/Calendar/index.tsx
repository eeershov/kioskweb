import React, { useEffect, useState } from 'react';
import axios from "axios";

function Calendar() {
  const [data, setData] = useState<EventData[] | []>([]);

  interface EventData {
    id: number;
    tp_name: string;
  }

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json",
    },
  };
  const getEvents = async () => {
    return await axios.get(
      "http://localhost:8080/api/events",
      config
    );
  };

  useEffect(() => {
    getEvents()
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.tp_name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default Calendar;