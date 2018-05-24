const { query, createRecord, updateRecord, deleteRecord } = require('../lib/nforce')
const { mapRecordsToFields } = require('../lib/utils')

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
    },

    async updateAccount(record) {
      const response = await updateRecord(org, 'Account', record, null)
      return response
    },

    async deleteAccount(record) {
      const response = await deleteRecord(org, 'Account', record, null)
      return response
    }
  }

}
