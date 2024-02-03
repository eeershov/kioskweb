import { ApiService } from "../services/api.service";
import { EventWithOrganizationData } from "../types/EventWithOrg.type";
import { format } from "date-fns";


export class CalendarData {
    data?: Map<string, [] | EventWithOrganizationData[]>;
    errorMessage?: String;
}

export class CalendarRepository {

    public static async fetchData(selectedDateLocal: any) : Promise<CalendarData> {
        const dateFormat = `yyyy-MM-dd`;
        const selectedDateString = format(selectedDateLocal, dateFormat);

        const result = new CalendarData()

        try {
            ApiService.getCalendarData(selectedDateString).then(response => {
                result.data = response
            });
        } catch (error: any) {
            result.errorMessage = error.message
        }

        return result

    }

}
