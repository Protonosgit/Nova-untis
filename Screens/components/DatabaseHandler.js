
import React, { useEffect, useContext } from "react";
import * as SQLite from 'expo-sqlite';
import * as SecureStore from 'expo-secure-store';
import { ContextStore } from "./ContextStore";


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

    const db = SQLite.openDatabase('useraccounts.db');
// create database
function PreRun() {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists accounts (id integer primary key not null, address text, displayName text, loginName text, schoolId text, serverUrl text, server text, username text, password text);'
        );
      });
      Setup();
}

async function add(address, displayName, loginName, schoolId, serverUrl, server,username, password) {
  // Checking if account exists
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM accounts WHERE username = ? AND schoolId = ?',
        [username, schoolId],
        (_, result) => {
          if (result.rows._array.length > 0) {
            // Updating account info
            db.transaction(tx => {
              tx.executeSql(
                'UPDATE accounts SET address= ?, displayName = ?, loginName = ?, schoolId = ?, serverUrl = ?, server = ? , username = ?, password = ? WHERE id = ?',
                [address, displayName, loginName, schoolId, serverUrl, server, username, password, result.rows._array[0].id ],
                (_, result) => {
                  resolve(result);
                },
                (_, error) => reject(error)
              );
            });
          } else {
            // Creating new account
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO accounts (address, displayName, loginName, schoolId, serverUrl, server, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
                [address, displayName, loginName, schoolId, serverUrl, server, username, password],
                (_, result) => {
                  resolve(result);
                },
                (_, error) => reject(error)
              );
            });
          }
        },
        (_, error) => reject(error)
      );
    });
  });
}


// Check if login required
function getUserAccounts() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM accounts', [], (tx, results) => {
            resolve(results);
          });
        });

      });
}
// Remove user account
async function removeAccount(id) {
  return new Promise((resolve, reject) => {
    db.transaction(async (tx) => {
      tx.executeSql(
        'DELETE FROM accounts WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
        );
      });
    });
}

// get specific acccount
async function getAccountInfo() {

  async function getusr() {
    const testme = await getKey('ActiveUser');
    return testme;
  }
  const userid = await getusr();
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM accounts where id = ?', [userid], (tx, results) => {
            resolve(results.rows._array[0]);
          });
        });

      });
}

// reset (debug)
async function purge() {
    db.transaction(tx => {
        tx.executeSql(
            'drop table if exists accounts',
            [],
            //(_, result) => console.log(result),(_, error) => console.warn(error)
        );
    });
    const db2 = SQLite.openDatabase('supportdata.db');
    db2.transaction(tx => {
        tx.executeSql(
            'drop table if exists subjects',
            [],
            //(_, result) => console.log(result),(_, error) => console.warn(error)
        );
        tx.executeSql(
          'drop table if exists teachers',);
        tx.executeSql(
          'drop table if exists departments',);
        tx.executeSql(
          'drop table if exists rooms',);
    });
    const db3 = SQLite.openDatabase('maindata.db');
    db3.transaction(tx => {
      tx.executeSql(
          'drop table if exists timetable',
          [],
          //(_, result) => console.log(result),(_, error) => console.warn(error)
      );
  });
    
}
async function resetConfig() {
  const user = await getKey('ActiveUser');
  const db2 = SQLite.openDatabase('supportdata.db');
  return new Promise((resolve, reject) => {
    db2.transaction(tx => {
      tx.executeSql(
        'DELETE FROM subjects WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM teachers WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM departments WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM rooms WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM students WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM classes WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM holidays WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM timegrid WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM statusdata WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM activeschoolyear WHERE user = ?',
        [user]
      );
      tx.executeSql(
        'DELETE FROM schoolyears WHERE user = ?',
        [user]
      );
    });
    const db3 = SQLite.openDatabase('maindata.db');
    db3.transaction(tx => {
      tx.executeSql(
        'DELETE FROM timetable WHERE user = ?',
        [user]
      );
      resolve();
    });
  });
}


// prepare config tables
function Setup() {
  const db2 = SQLite.openDatabase('supportdata.db');
    db2.transaction(tx => {
        tx.executeSql(
          'create table if not exists subjects (alternateName text, id text, longName text, name text, user integer);',
          //(_, result) => {console.log(result)},(_, error) => console.warn(error)
        );
        tx.executeSql(
          'create table if not exists departments (longName text, id text, name text, user integer);',
        );
        tx.executeSql(
          'create table if not exists rooms (building text, id text, longName text, name text, user integer);',
        );
        tx.executeSql(
          'create table if not exists teachers (longName text, id text, foreName text, name text, foreColor text, backColor text, user integer);',
        );
        
        tx.executeSql(
          'create table if not exists students (id integer, key text, name text, foreName text, longName text, gender text, user integer);',
        );
        tx.executeSql(
          'create table if not exists classes (id integer, name text, longName text, foreColor text, backColor text, user integer);',
        );
        tx.executeSql(
          'create table if not exists holidays (id integer, name text, longName text, startDate integer, endDate integer, user integer);',
        );
                
        tx.executeSql(
          'create table if not exists timegrid (day integer, startTime integer, endTime integer, user integer);',
        );
        tx.executeSql(
          'create table if not exists statusdata (type text, category text, foreColor text, backColor text, user integer);',
        );
        tx.executeSql(
          'create table if not exists activeschoolyear (id integer, startDate text, endDate text, name text, user integer);',
        );            
        tx.executeSql(
          'create table if not exists schoolyears (id text, name text,startDate text,endDate text, user integer);',
        );
        });
        const db3 = SQLite.openDatabase('maindata.db');
        db3.transaction(tx => {
          tx.executeSql(
            'create table if not exists timetable (id integer, date integer, startTime integer, endTime integer, kl text, su text, ro text, te text, statflags text, lsnumber integer, lstext text, info text, sg text, activityType text, code text, substText text, user integer);',
            //(_, result) => {console.log(result)},(_, error) => console.warn(error)
          );
    
        });
}

// insert config data from untis api request
async function departments(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO departments (longName, id, name, user) VALUES (?, ?, ?, ?)',
          [item.longName, item.id, item.name, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}

async function rooms(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO rooms (building, longName, id, name, user) VALUES (?, ?, ?, ?, ?)',
          [ item.building, item.longName, item.id, item.name, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
  } else{return false}
}

async function teachers(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction((tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO teachers (longName , id, foreName, name, foreColor, backColor, user) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [item.longName, item.id, item.foreName, item.name, item.foreColor, item.backColor, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}

async function subjects(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO subjects (alternateName, id, longName, name, user) VALUES (?, ?, ?, ?, ?)',
          [item.alternateName, item.id, item.longName, item.name, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}
async function students(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO students (id, key, foreName, longName, gender, name, user) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [item.id, item.key, item.foreName, item.longName, item.gender, item.name, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}
async function classes(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO classes (id, longName, name, foreColor, backColor, user) VALUES (?, ?, ?, ?, ?, ?)',
          [item.id, item.longName, item.foreColor, item.backColor, item.name, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}
async function holidays(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO holidays (id, name, longName, startDate, endDate, user) VALUES (?, ?, ?, ?, ?, ?)',
          [item.id, item.name, item.longName, item.startDate, item.endDate, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}
async function timegrid(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO timegrid (day, startTime, endTime, user) VALUES (?, ?, ?, ?)',
          [item.day, item.timeUnits.startTime, item.timeUnits.endTime, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}
async function statusdata(untisdata) {
  if (untisdata) {
  const codes = untisdata.codes;
  const lstypes = untisdata.lstypes;
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      codes.forEach((item) => {
        tx.executeSql(
          'INSERT INTO statusdata (type, category, foreColor, backColor, user) VALUES (?, ?, ?, ?, ?)',
          [Object.keys(item)[0], 'codes', item.foreColor, item.backColor, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
      lstypes.forEach((item) => {
        tx.executeSql(
          'INSERT INTO statusdata (type, category, foreColor, backColor, user) VALUES (?, ?, ?, ?, ?)',
          [Object.keys(item)[0], 'lstypes', item.foreColor, item.backColor, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}
async function activeschoolyear(untisdata) {
  if (untisdata) {
    const db2 = SQLite.openDatabase('supportdata.db');
    const user = await getKey('ActiveUser');
    return new Promise((resolve, reject) => {
      db2.transaction(async (tx) => {
        tx.executeSql(
          'INSERT INTO activeschoolyear (id, name, startDate, endDate, user) VALUES (?, ?, ?, ?, ?)',
          [untisdata.id, untisdata.name, untisdata.startDate, untisdata.endDate, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  } else{return false}
}
async function schoolyears(untisdata) {
  if (untisdata) {
  const db2 = SQLite.openDatabase('supportdata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db2.transaction(async (tx) => {
      untisdata.forEach((item) => {
        tx.executeSql(
          'INSERT INTO schoolyears (id, name, startDate, endDate, user) VALUES (?, ?, ?, ?, ?)',
          [item.id, item.name, item.startDate, item.endDate, user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
} else{return false}
}

// Main data
// units saver (unused)
async function timetable(untisdata) {
  const db3 = SQLite.openDatabase('maindata.db');
  const user = await getKey('ActiveUser');
  return new Promise((resolve, reject) => {
    db3.transaction(async (tx) => {
      untisdata.forEach((item) => {
        var [id,date,startTime,endTime,activityType,code,substText,statflags,lsnumber,lstext,info,sg,kl,su,ro,te] = '';
        var [id,date,startTime,endTime,activityType,code,substText,statflags,lsnumber,lstext,info,sg,kl,su,ro,te] = [item.id,item.date,item.startTime,item.endTime,item.activityType,item.code,item.substText,item.statflags,item.lsnumber,item.lstext,item.info,item.sg,JSON.stringify(item.kl),JSON.stringify(item.su),JSON.stringify(item.ro),JSON.stringify(item.te)];
        tx.executeSql(
          'INSERT INTO timetable (id, date, startTime, endTime, activityType, code, substText, statflags, lsnumber, lstext, info, sg, kl, su, ro, te, user) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
          [id,date,startTime,endTime,activityType,code,substText,statflags,lsnumber,lstext,info,sg,kl,su,ro,te,user],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  });
}

// read untis data
async function readData(type) {
  const user = await getKey('ActiveUser');
  const db3 = SQLite.openDatabase('maindata.db');
  return new Promise((resolve, reject) => {
      db3.transaction((tx) => {
        tx.executeSql('SELECT * FROM timetable WHERE user = ?', [user], (tx, results) => {
          resolve(results);
        });
      });
    });
}
// read config data
async function readConfig(type) {
  const user = await getKey('ActiveUser');
  const db2 = SQLite.openDatabase('supportdata.db');
  return new Promise((resolve, reject) => {
      db2.transaction((tx) => {
        tx.executeSql(`SELECT * FROM ${type} WHERE user = ?`, [user], (tx, results) => {
          resolve(results);
        });
      });
    });
}

// (debug)
async function testread() {
  const user = await getKey('ActiveUser');
  //const db2 = SQLite.openDatabase('supportdata.db');
  const db3 = SQLite.openDatabase('maindata.db');
  return new Promise((resolve, reject) => {
      db3.transaction((tx) => {
        tx.executeSql('SELECT * FROM timetable WHERE user = ?', [user], (tx, results) => {
          resolve(results);
        });
      });
    });
}

export { PreRun, getAccountInfo, purge, add, removeAccount, getUserAccounts, Setup, departments, subjects, teachers, rooms, students, holidays, classes, timegrid, statusdata, testread, activeschoolyear, schoolyears, resetConfig, timetable, readData, readConfig };