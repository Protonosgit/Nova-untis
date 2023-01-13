//Login
import React, { useEffect } from "react";

function untisLogin(usrname,usrpass) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "authenticate",params: {user: usrname, password: usrpass} })
    };
    return fetch('https://cissa.webuntis.com/WebUntis/jsonrpc.do?school=Leibniz-Gym Neustadt',requestOptions).then(res=>res.json())
}

function untisLogout() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "req0",jsonrpc: "2.0",method: "logout",params: {} })
    };
    return fetch('https://cissa.webuntis.com/WebUntis/jsonrpc.do?school=Leibniz-Gym Neustadt',requestOptions).then(res=>res.json())
}

function untisSchoolQuery(searchterm) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: "wu_schulsuche-1673126963269",method: "searchSchool",params: [{search: searchterm}],jsonrpc: "2.0"})
    };
    return fetch('https://schoolsearch.webuntis.com/schoolquery2',requestOptions).then(res=>res.json())
}

export { untisLogin, untisLogout, untisSchoolQuery };
