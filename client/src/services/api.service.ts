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
      const response = await axios.get(`${backend}/api/events${dateString !== undefined ? ("/"+dateString) : ""}`, config);
      return response.data;
    } catch (error) {
      throw new Error("Error while getting data from server.")
    }
  }

  private static convertToMap(data: EventWithOrganizationData[] | [], dateString?: string): Map<string, EventWithOrganizationData[] | []> {
    // Get the dates for the current month (6 weeks)
    // From first week of the month, from Monday to Sunday
    const dateFormat = `d-M-yyyy`;
    const monthBlockDates = getMonthBlockDates(dateString);

    const eventsByDay = new Map();
    monthBlockDates.map((blockDate, _index) => {
      // Filter events for the current date
      const dateEvents = data.filter((event) => {
        const eventDate = new Date(event.tp_starts_at);
        return (
          eventDate.getDate() === blockDate.getDate() &&
          eventDate.getMonth() === blockDate.getMonth() &&
          eventDate.getFullYear() === blockDate.getFullYear()
        );
      });
      return eventsByDay.set(format(blockDate, dateFormat), dateEvents);
    })
    return eventsByDay;

    function getMonthBlockDates(dateString?: string) {
      const currentDate = new Date();
      const serverFormatString = `yyyy-MM-dd`;
      
      let selectedDate;
      if (dateString) {
        selectedDate = parse(dateString,serverFormatString,currentDate);
      } else {
        selectedDate = currentDate;
      }

      let firstDayOfMonthBlock: Date;
      if (isFirstDayOfMonth(selectedDate) && isMonday(selectedDate)) {
        firstDayOfMonthBlock = selectedDate;
      } else {
        const dateString = `1-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const firstDayOfM = parse(dateString, dateFormat, selectedDate);
        if (isMonday(firstDayOfM)) {
          firstDayOfMonthBlock = firstDayOfM;
        } else {
          firstDayOfMonthBlock = previousMonday(firstDayOfM);
        }
      }

      const monthBlockDates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(firstDayOfMonthBlock);
        date.setDate(date.getDate() + i);
        return date;
      });
      return monthBlockDates;
    }
  }
  
  /**
   * 
   * Gets Map of 42 { d-M-yyyy, [] }
   * @param dateString must be in yyyy-MM-dd
   * @returns
   */
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
      return this.convertToMap(data, dateString);  
    } catch (error) {
      throw new Error("Error converting data");
    }
  }
}
