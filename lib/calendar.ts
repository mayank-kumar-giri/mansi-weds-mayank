function toICSDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

type CalEvent = {
  title: string
  description?: string
  location?: string
  start: Date
  durationMinutes: number
}

export function googleCalendarUrl(e: CalEvent) {
  const end = new Date(e.start.getTime() + e.durationMinutes * 60_000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${toICSDate(e.start)}/${toICSDate(end)}`,
    details: e.description ?? '',
    location: e.location ?? '',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function icsDataUri(e: CalEvent) {
  const end = new Date(e.start.getTime() + e.durationMinutes * 60_000)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mayank and Mansi//Wedding//EN',
    'BEGIN:VEVENT',
    `UID:${toICSDate(e.start)}-${e.title.replace(/\s+/g, '')}@wedding`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(e.start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${(e.description ?? '').replace(/\n/g, '\\n')}`,
    `LOCATION:${e.location ?? ''}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`
}
