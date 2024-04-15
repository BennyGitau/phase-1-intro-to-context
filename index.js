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


/*
 function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  // Function to find an employee by their first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // Function to calculate total wages for an employee
  const allWagesFor = function () {
      const eligibleDates = this.timeInEvents.map(function (e) {
          return e.date
      })
  
      const payable = eligibleDates.reduce(function (memo, d) {
          return memo + wagesEarnedOnDate.call(this, d)
      }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
      return payable
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor.call(employee);
    }, 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
  };
  */