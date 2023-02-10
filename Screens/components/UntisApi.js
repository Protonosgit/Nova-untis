//Login
import React, { useEffect } from "react";
import * as database from "./DatabaseHandler"
import * as SecureStore from 'expo-secure-store';
import moment from 'moment'; 

  // key value sys
  function setKey(key, value) {
    return SecureStore.setItemAsync(key, value)
      .catch((error) => {
        console.error(`Error saving item with key: ${key}`, error);
      });
  }
  async function getKey(key) {
    return SecureStore.getItemAsync(key)
  }

  //prepare urls for requests
async function servHost(type) {
    const uacc = await database.getAccountInfo()
    if (type===0){
        return('https://'+uacc.server+'/WebUntis/jsonrpc.do?school='+uacc.loginName)
    }
    if (type===1){
        return('https://'+uacc.server)
    }
    if (type===3){
        return('https://'+uacc.server+'/WebUntis/api/rest/extern/v1/timetable')
    }
    return(null)
}
//Login user from login screen
function initialLogin(usrname, usrpass, server, loginName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "authenticate",client: "NovaUntis" ,params: {user: usrname, password: usrpass} })
    };
    return fetch('https://'+server+'/WebUntis/jsonrpc.do?school='+loginName,requestOptions).then(res=>res.json())
}
// Followup calls to update jsessionid
async function login(usrname,usrpass) {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "authenticate",client: "NovaUntis" ,params: {user: usrname, password: usrpass} })
    };
    return fetch(host,requestOptions).then(res=>res.json())
}

// unused (debug)
async function logout(host) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "logout",params: {} })
    };
    return fetch('https://cissa.webuntis.com/WebUntis/jsonrpc.do?school=Leibniz-Gym Neustadt',requestOptions).then(res=>res.json())
}
//Search for schools
function untisSchoolQuery(searchterm) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: "query001",method: "searchSchool",params: [{search: searchterm}],jsonrpc: "2.0"})
    };
    return fetch('https://schoolsearch.webuntis.com/schoolquery2',requestOptions).then(res=>res.json())
}

//begin config fetching
let getSession = '';
async function initConfigChain(session) {
    getSession = session;
    subjects();

}
// fetch config data --start
async function subjects() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getSubjects",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.subjects(res).then(rooms())}))
}
async function rooms() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getRooms",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.rooms(res).then(teachers())}))
}
async function teachers() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getTeachers",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.teachers(res).then(departments())}))
}
async function departments() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getDepartments",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.departments(res).then(students())}))
}
async function students() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getStudents",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.students(res).then(classes())}))
}
async function classes() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getKlassen",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.classes(res).then(holidays())}))
}
async function holidays() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getHolidays",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.holidays(res).then(timegrid)}))
}
async function timegrid() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getTimegridUnits",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.timegrid(res).then(activeschoolyear())}))
}
async function activeschoolyear() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getCurrentSchoolyear",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.activeschoolyear(res).then(schoolyears())}))
}
async function schoolyears() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getSchoolyears",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.schoolyears(res).then(statusdata())}))
}
async function statusdata() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getStatusData",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.statusdata(res).then(()=>{fetchdata(0)})}))
}

// fetch config data end--
// begin data fetching --
async function fetchdata(mode) {
    if(mode===0) {
        timetable()
    }
    if (mode===1) {
        getToken()
    }
}

// get token
let token = '';
async function getToken() {
    const host = await servHost(1);
    const requestOptions = {
        method: 'GET',
        headers: { 'Accept': 'application/json, text/plain, */*','Content-Type': 'application/json' }
    };
    //return fetch(host+'/WebUntis/api/token/new' ,requestOptions).then(res=>res.text().then((res)=>{setKey('Bearer',res)}))
    fetch(host+'/WebUntis/api/token/new' ,requestOptions).then(res=>res.text().then((res)=>{let token = res; timetableV2()}))
}
async function lastupdate() {
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "getLatestImportTime",client: "NovaUntis" ,params: {} })
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.test(res).then()}))
}
// Fetch timetable data from untis
async function timetable() {
    const timestamp = moment();
    const host = await servHost(0);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"id": "req0","jsonrpc": "2.0","method": "getTimetable","client": "NovaUntis","params": {  "options": {"element": {"id": getSession.personId,"type": getSession.personType},"startDate": parseInt(timestamp.subtract(7,'day').format('YYYYMMDD')),"endDate": parseInt(timestamp.add(7,'day').format('YYYYMMDD')),"showBooking": true,"showInfo": true,"showSubstText": true,"showLsText": true,"showLsNumber": true,"showStudentgroup": true}}})
    };
    fetch(host ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{database.timetable(res).then((res)=>{})}))
}
// Fetch all data from untis (not implemented) & (add database filler)
async function timetableV2() {
    const host = await servHost(3);
    //schoolyear dates (debug)
    const start = '2022-08-05T10:15:30';
    const end = '2023-08-05T10:15:30';
    const student = 0;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token },
    };
    fetch(host+'?start='+start+'&end='+end+'&student='+student ,requestOptions).then(res=>res.json().then(res=>res.result).then((res)=>{console.log(res)}))
}
//data fetching end--

export { initialLogin, login, logout, untisSchoolQuery, initConfigChain, fetchdata, getToken };
