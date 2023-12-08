import {SalesforceService} from '~/services/SalesforceDataService'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const service = await SalesforceService.getInstance();
  const resp = await service.queryData(`SELECT Id, Name, StartDate, EndDate, Status, Type, ExpectedRevenue, BudgetedCost, ActualCost
  FROM Campaign where Id='${id}'`);
  return resp; 
})