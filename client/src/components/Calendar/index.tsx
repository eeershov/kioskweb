import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backend } from "../../utils/address";
import Week from "./Week";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

function Calendar() {
  const [data, setData] = useState<EventWithOrganizationData[] | []>([]);
  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    };
    async function getEvents(): Promise<void> {
      try {
        const response = await axios.get(`${backend}:8080/api/events`, config);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getEvents();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <Week events={data} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default Calendar;