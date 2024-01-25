import config from '../../config';
import SophtronBaseClient from './base';

export default class SophtronV2Client extends SophtronBaseClient{
  constructor(apiConfig: any){
    super(apiConfig);
  }

  getCustomer(customerId: string){
    return this.get(`/v2/customers/${customerId}`)
  }

  async getCustomerByUniqueName(unique_name: string){
    const arr = await this.get(`/v2/customers?uniqueID=${unique_name}`)
    return arr?.[0];
  }

  createCustomer(unique_name: string){
    return this.post(`/v2/customers`,{
      UniqueID: unique_name,
      Source: `Universal_Widget_${config.HostUrl}`,
      Name: 'UniversalWidget_Customer'
    })
  }

  getMember(customerId: string, memberId: string){
    return this.get(`/v2/customers/${customerId}/members/${memberId}`)
  }

  createMember(customerId: string, job_type: string, username: string, password: string, institution_id: string){
    return this.post(`/v2/customers/${customerId}/members/${job_type}`, {
      UserName: username,
      Password: password,
      InstitutionID: institution_id
    })
  }

  updateMember(customerId: string, memberId: string, job_type: string, username: string, password: string){
    return this.put(`/v2/customers/${customerId}/members/${memberId}/${job_type}`, {
      UserName: username,
      Password: password
    })
  }

  refreshMember(customerId: string, memberId: string, job_type: string){
    return this.post(`/v2/customers/${customerId}/members/${memberId}/${job_type}`)
  }

  deleteMember(customerId: string, memberId: string){
    return this.del(`/v2/customers/${customerId}/members/${memberId}`)
  }
};
