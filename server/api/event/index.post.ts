import {SalesforceService} from '~/services/SalesforceDataService'

export default defineEventHandler(async (event) => {
  const service = await SalesforceService.getInstance();
  const data = await readBody(event)
  console.log(data)
  const resp = await service.createRecord('Campaign',data)
  return resp; 
})
