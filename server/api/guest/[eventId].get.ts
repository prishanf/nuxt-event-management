import {SalesforceService} from '~/services/SalesforceDataService'

export default defineEventHandler(async (event) => {
  const service = await SalesforceService.getInstance();
  const campainId = getRouterParam(event, 'eventId')
  const resp = await service.queryData(`SELECT Id ,Name, Email, Phone,Status FROM CampaignMember where CampaignId ='${campainId}' order by Name`);
  return resp; 
})
