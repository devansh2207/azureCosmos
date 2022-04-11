var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var prompt = require('prompt-sync')();
var url = mongodb://azure2:uZVIYXwZA2F3ho90gl0H4WupAPHUGuS2YuiDVce0yQBGsGI2upxkjLeCXzoSTbYzcg5zBiMnDOX5qW51BBROFw==@azure2.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@azure2@
const express = require('express');
const app = express()
const option = prompt("Option A or B?");

switch (option)
{
    case 'A':
        MongoClient.connect(url, function(err, db)
        {
            if (err) throw err;
            var name = prompt('Name input');
            var clgname = prompt('College name input');
            var record = { name: name, collegename: clgname }
            db.db('database').collection('StudentRecords').insertOne(record, function(err, res) {
              if (err) throw err;
              console.log("Insertion Successful");
              db.close();
            });
          });
        break;

    case 'B':

        MongoClient.connect(url, function(err, db) {

            if (err) throw err;
            var name = prompt('Enter a name: ')
            const wordarr = (name.split(" "));
            for (var i = 0; i<wordarr.length; i++)
            {
              var operation = {$or: [{name :{$regex :wordarr[i],$options : 'i'}},
              {collegename :{$regex :wordarr[i],$options : 'i'}}]}
              db.db('database').collection("database").find(operation).toArray(function(err, answer)
              {
              if (err) throw err
              else if(answer.length >0)
                console.log(answer)
            });
            }
            setTimeout(()=>{
              db.close()
            },4000)
          });
          break;

    default:
        console.log('Invalid option! Please select a valid one.')
}