// Your code here


function  createEmployeeRecord (array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []

    }
};
createEmployeeRecord(array);

function createEmployeeRecords (array){

    return array.map((array) => {
        return createEmployeeRecord(array);
        
    });
    

}

function createTimeInEvent(createEmployeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(" ");

    const timeInEvent ={
        type: "TimeIn",
        hour: Number(hour),
        date: date
    };
      createEmployeeRecord.timeInEvents.push(timeInEvent);

      return createEmployeeRecord;

}

function createTimeOutEvent(createEmployeeRecord, timeStamp){
      const [date, hour] = timeStamp.split(" ");

    const timeInEvent ={
        type: "TimeOut",
        hour: Number(hour),
        date: date
    };
      createEmployeeRecord.timeOutEvents.push(timeInEvent);

      return createEmployeeRecord;
}


function hoursWorkedOnDate(createEmployeeRecord, date){
    const timeIn = createEmployeeRecord.timeInEvents.find(day => day.date === date)
    const timeOut = createEmployeeRecord.timeOutEvents.find(day => day.date=== date)
    return (timeOut.hour - timeIn.hour) / 100;


}

function wagesEarnedOnDate(createEmployeeRecord, date){
  
    return hoursWorkedOnDate(createEmployeeRecord, date) * createEmployeeRecord.payPerHour
}

function allWagesFor (createEmployeeRecord) {
  const availableDates = createEmployeeRecord.timeInEvents.map((event)=>{
    return event.date
  })
  const payOwed = availableDates.reduce((acc,date)=>{
    return acc + wagesEarnedOnDate(createEmployeeRecord,date)
  },0)
  return payOwed;
}

function calculatePayroll (employeeRecords){
  return employeeRecords.reduce((acc,employee) =>{
    return acc + allWagesFor(employee)
  },0)
}

