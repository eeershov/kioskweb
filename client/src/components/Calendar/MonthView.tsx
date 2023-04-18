import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions, previousMonday, isMonday } from "date-fns";
import { ru } from 'date-fns/locale';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


interface Events {
  events: EventWithOrganizationData[] | []
}

export default function MonthView({ events }: Events) {

  return (
    <div>
      <h1>Month!</h1>
    </div>
  );
}