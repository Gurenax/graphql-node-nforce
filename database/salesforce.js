const nforce = require('nforce')

module.exports = org => {
  return {
    async getAccounts() {
      const response = await query(org, `
        select Id, Name, SLA__c from Account
      `, null)
      return mapRecordsToFields(response)
    },

    async getAccountById(id) {
      const response = await query(org, `
        select Id, Name, SLA__c from Account WHERE Id = '${id}'
      `, null)
      return mapRecordsToFields(response)
    },

    async createAccount(record) {
      const response = await createRecord(org, 'Account', record, null)
      return response
    }
  }

}

// TODO: Put these functions in a util class
/**
 * Map salesforce response records to its fields
 * @param {list} records - list of records from salesforce response
 * @return {list} list of records which correspond to their fields
 */
const mapRecordsToFields = records => (
  records.reduce((result, record) => ([...result, record._fields]), [])
)

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
  const sobj = nforce.createSObject(sobjectName)
  Object.entries(recordData).map(([key, value]) => {
    sobj.set(key, value)
  })
  return new Promise((resolve, reject) => {
    org.insert(
      {
        sobject: sobj,
        oauth: oauth
      },
      (error, response) => {
        if (!error) {
          resolve(response)
        } else {
          reject(error)
        }
      }
    )
  })
}

// /**
//  * Update a record
//  * @param {string} sobjectName - Name of the SObject (e.g. Account)
//  * @param {object} recordDataWithID  - Key value pair of Field Names and Field Values
//  * @param {object} oauth       - OAuth string received from successful authentication
//  */
// const updateRecord = (sobjectName, recordDataWithID, oauth) => {
//   const sobj = nforce.createSObject(sobjectName)
//   Object.entries(recordData).map(([key, value]) => {
//     sobj.set(key, value)
//   })
//   return new Promise((resolve, reject) => {
//     org.update(
//       {
//         sobject: sobj,
//         oauth: oauth
//       },
//       (error, response) => {
//         if (!error) {
//           resolve(response)
//         } else {
//           reject(error)
//         }
//       }
//     )
//   })
// }