//Login
import React, { useEffect } from "react";
import * as SQLite from 'expo-sqlite';
import * as SecureStore from 'expo-secure-store';


  // key value sys
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

const db = SQLite.openDatabase('useraccounts.db');

// create database
function PreRun() {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists schools (id integer primary key not null, address text, displayName text, loginName text, schoolId text, serverUrl text, username text, password text);'
        );
      });
    
}

function add(address, displayName, loginName, schoolId, serverUrl, username, password) {
    // Checking if account exists
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM schools WHERE username = ? AND schoolId = ?',
            [username, schoolId],
            (_, result) => {
                if (result.rows._array.length>0) {
                    //Updating account info
                    db.transaction(tx => {
                        tx.executeSql(
                            'update schools set address= ?, displayName = ?, loginName = ?, schoolId = ?, serverUrl = ?, username = ?, password = ? where id = ?',
                           [address,displayName,loginName,schoolId,serverUrl,username,password, result.rows._array[0].id],
                            (_, result) => save('ActiveUser',result.insertId),
                            (_, error) => console.warn(error)
                        );
                    });

                  } else {
                    //Creating new account
                    db.transaction(tx => {
                        tx.executeSql(
                            'insert into schools (address, displayName, loginName, schoolId, serverUrl, username, password) values (?, ?, ?, ?, ?, ?, ?);',
                            [address,displayName,loginName,schoolId,serverUrl,username,password],
                            (_, result) => save('ActiveUser',result.insertId),
                            (_, error) => console.warn(error)
                        );
                    });
                  }
            },
            (_, error) => console.warn(error)
        );
    });
}

// Check if login required
function getUserAccounts() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM schools', [], (tx, results) => {
            resolve(results);
          });
        });
      });
}

// get specific acccount
function getAccountInfo(userid) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM schools where id = ?', [userid], (tx, results) => {
            resolve(results.rows._array[0]);
          });
        });
      });
}
// reset (debug)
function purge() {
    db.transaction(tx => {
        tx.executeSql(
            'drop table if exists schools',
            [],
            (_, result) => console.log(result),
            (_, error) => console.warn(error)
        );
    });
}

export { PreRun, getAccountInfo, purge, add, getUserAccounts };