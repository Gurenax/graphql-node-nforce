const nforce = require('nforce')

/**
 * Perform a SOQL Query
 * @param {object} org         - Salesforce org
 * @param {string} queryString - SOQL query
 * @param {object} oauth       - OAuth string received from successful authentication
 * @return {Promise}
 */
const query = (org, queryString, oauth) =>
  new Promise((resolve, reject) => {
    org.query(
      {
        query: queryString,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          resolve(response.records)
        } else {
          reject(error)
        }
      }
    )
  })

/**
 * Create a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordData  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 */
const createRecord = (org, sobjectName, recordData, oauth) => {
  const sobj = nforce.createSObject(sobjectName, recordData)
  return new Promise((resolve, reject) => {
    org.insert(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          recordData.id = response.id
          resolve(recordData)
        } else {
          reject(error)
        }
      }
    )
  })
}

/**
 * Update a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 */
const updateRecord = (org, sobjectName, recordDataWithID, oauth) => {
  const sobj = nforce.createSObject(sobjectName, recordDataWithID)
  return new Promise((resolve, reject) => {
    org.update(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          // resolve(response)
          resolve(recordDataWithID)
        } else {
          reject(error)
        }
      }
    )
  })
}

/**
 * Delete a record
 * @param {object} org         - Salesforce org
 * @param {string} sobjectName - Name of the SObject (e.g. Account)
 * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
 * @param {object} oauth       - OAuth string received from successful authentication
 */
const deleteRecord = (org, sobjectName, recordDataWithID, oauth) => {
  const sobj = nforce.createSObject(sobjectName, recordDataWithID)
  return new Promise((resolve, reject) => {
    org.delete(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          // resolve(response)
          resolve(recordDataWithID)
        } else {
          reject(error)
        }
      }
    )
  })
}

module.exports = {
  query,
  createRecord,
  updateRecord,
  deleteRecord
}