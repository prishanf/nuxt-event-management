import {SalesforceService} from '~/services/SalesforceDataService'

export default defineEventHandler(async (event) => {
  const service = await SalesforceService.getInstance()
  const body = await readBody(event)
  const campainId = getRouterParam(event, 'eventId')
  body.Company ='NA'
  const leadResp = await service.createRecord('Lead',body)
  if(leadResp && leadResp.id!){
    const campaignMember={
      CampaignId:campainId,
      LeadId:leadResp.id
    }
    const campaignMemberResp = await service.createRecord('CampaignMember',campaignMember)
    return campaignMemberResp;
  }
})
