// import React, { Component } from 'react'
//
// import IC from 'iatacodes'
// const ic = new IC('772513cb-42b7-4262-b735-00d2f52eb796')
//
//
// // ic.api('timetable', {code: 'DEN', type: 'departure'}, function(error, response) {
// //   console.log(response);
// // });
//
// var airportCode
// var departureCode
// var arrivalCode
//
// function allData() {
//   ic.api('airports', {code: 'DEN'}, function(error, response) {
//     airportCode = response[0].code
//   })
//
//   ic.api('routes', {departure: 'DEN'}, function(error, response) {
//     departureCode = response.map(function(data) {
//       return data.departure
//     })
//   })
//
// console.log(departureCode)
// console.log(airportCode)
//
// }
//
// allData()
