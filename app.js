const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

app.listen(3000, function () {
    console.log('listening on 3000');
});

app.get('/', function (req, res) {

    /*task 1*/
    var date = new Date();
    getData(date, 'Verzhina', printData);

    /*task 2*/
    var url = "mongodb://localhost:27017/backend101";

    /*MongoClient.connect(url, function (err, db) {
     if (err) throw err;

     db.createCollection('users', {
     username: 'admin',
     password: 'Qw123456',
     display_name: 'John',
     email: 'john@test.com',
     avatar: '/images/avatar1.png'
     });
     db.close();
     });*/

    /*task 3*/
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect. Error:', err);
        } else {
            console.log('Connected to the mongoDB::', url);

            var collection = db.collection('users');

            var usersData = [
                {
                    username: 'admin',
                    password: 'Qw123456',
                    display_name: 'John',
                    email: 'john@test.com',
                    avatar: '/images/avatar1.png'
                },
                {
                    username: 'user',
                    password: 'Qw123456',
                    display_name: 'Ben',
                    email: 'ben@test.com',
                    avatar: '/images/avatar2.png'
                },
                {
                    username: 'curator',
                    password: 'Qw123456',
                    display_name: 'Jane',
                    email: 'jane@test.com',
                    avatar: '/images/avatar3.png'
                }];

            // Insert some users
            collection.insertMany(usersData, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d', data.result.n);
                    collection.updateOne({username: 'admin'}, {$set: {display_name: 'Nabugodonosor'}}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else if (data) {
                            console.log('Updated Successfully %d document(s).', data.result.n);
                        } else {
                            console.log('No document found.');
                        }
                        db.close();
                    });
                }
            });
        }
    });

    function getData(dateTime, name, callback) {
        var result = (dateTime.getDay() % 2) && (dateTime.getHours() % 2) ? name + ', It\'s lunch time!' : name + ', It\'s working time :(';
        callback(result);
    }

    function printData(text) {
        console.log(text);
        res.send(text);
    }
});

