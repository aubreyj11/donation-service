import React from 'react'
import { useState } from 'react'
import { Calendar as ReactCalendar } from 'react-calendar'


function Calendar() {
const [date, setDate] = useState(new Date())

console.log(date.toDateString())

 return (
    <>
    <div className='calendar-ctn'>
        <ReactCalendar onChange={setDate} value={date} />
    </div>
    <div className='text-center'>
    Selected date: {date.toDateString()}
    </div>
    </>
  )
}

export default Calendar