import axios from "axios";
import { backend } from "../utils/address";

import { EventWithOrganizationData } from "../types/EventWithOrg.type";

export class ApiService {
  public static async getEvents() : Promise<EventWithOrganizationData[] | [] | "Error"> {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(`${backend}:8080/api/events`, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return "Error";
    }
  }

}