let {personDetails,personSchema} = require('../model/personModel');

let persons = require('./persons');


async function searchbyAge(age){
  const personDetails= await personDetails.find({age:age});
  return personDetails;
}; 


module.exports.searchbyAge=searchbyAge;