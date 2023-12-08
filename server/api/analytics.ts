import {SalesforceService} from '~/services/SalesforceDataService'

export default defineEventHandler(async (event) => {
  const service = await SalesforceService.getInstance();
  const resp = await service.queryData(`SELECT COUNT(Id), CALENDAR_MONTH(StartDate) 
  FROM Campaign 
  WHERE CALENDAR_YEAR(StartDate) = 2023
  GROUP BY CALENDAR_MONTH(StartDate)`);
  return resp; 
})
