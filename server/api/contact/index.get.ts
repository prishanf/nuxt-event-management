import {SalesforceService} from '~/services/SalesforceDataService'

export default defineEventHandler(async (event) => {
  const service = await SalesforceService.getInstance();
  const resp = await service.queryData(`Select Id, Name,Email,Phone from Contact LIMIT 20`);
  return resp; 
})
