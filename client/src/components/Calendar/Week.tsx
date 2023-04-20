interface WeekEvents {
  weekEvents: Map<Date, []>
}

export default function Week({ weekEvents }: WeekEvents) {
  console.log("Week");
  console.log(weekEvents);
  return (
    <div className="Week">
      "week"
    </div>
  )
}