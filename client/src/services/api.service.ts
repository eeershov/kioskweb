import axios from "axios";
import { isFirstDayOfMonth, isMonday, parse, previousMonday, format } from "date-fns";

import { backend } from "../utils/address";

import { EventWithOrganizationData } from "../types/EventWithOrg.type";


export class ApiService {
  private static async getEvents(dateString?: string) : Promise<EventWithOrganizationData[] | [] | "Error"> {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(`${backend}:8080/api/events${dateString !== undefined ? ("/"+dateString) : ""}`, config);
      return response.data;
    } catch (error) {
      throw new Error("Error while getting data from server.")
    }
  }

  private static convertToMap(data: EventWithOrganizationData[] | []): Map<string, EventWithOrganizationData[] | []> {
    // Get the dates for the current month (6 weeks)
    // From first week of the month, from Monday to Sunday

    const currentDate = new Date();
    let theDay: Date;
    let firstDayOfM: Date;
    if (isFirstDayOfMonth(currentDate) && isMonday(currentDate)) {
      theDay = currentDate;
    } else {
      const dateString = `1-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
      firstDayOfM = parse(dateString, `d-M-yyyy`, currentDate);
      if (isMonday(firstDayOfM)) {
        theDay = firstDayOfM;
      } else {
        theDay = previousMonday(firstDayOfM);
      }
    }
    const monthDates = Array.from({ length: 42 }, (_, i) => {
      const date = new Date(theDay);
      date.setDate(date.getDate() + i);
      return date;
    });

    const eventsByDay = new Map();
    monthDates.map((monthDate, _index) => {
      // Filter events for the current date
      const dateEvents = data.filter((event) => {
        const eventDate = new Date(event.tp_starts_at);
        return (
          eventDate.getDate() === monthDate.getDate() &&
          eventDate.getMonth() === monthDate.getMonth() &&
          eventDate.getFullYear() === monthDate.getFullYear()
        );
      });
      return eventsByDay.set(format(monthDate, `d-M-yyyy`), dateEvents);
    })

    return eventsByDay;
  }
  
  public static async getCalendarData(dateString?: string): Promise<Map<string, EventWithOrganizationData[] | []>> {
    let data;
    try {
      data = await this.getEvents(dateString);
    } catch (error) {
      throw new Error("Error while getting data from server.");
    }
    if (data === "Error") {
      throw new Error("Error getting data from server");
    }

    try {
      return this.convertToMap(data);  
    } catch (error) {
      throw new Error("Error getting data from server");
    }
  }
}