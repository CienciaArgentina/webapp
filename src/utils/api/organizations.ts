import { httpClient, cienciaArgentinaHost } from 'utils/httpClient';
import { DepartmentsRequest } from './departments';

const ORGANIZATIONS = "/organizations";

interface OrganizationsRequest {
    id?: number;
    name?: string;
    acronym?: string;
    summary?: string;
    description?: string;
    website?: string;
    organization_type?: string;
    departments?: DepartmentsRequest[] | null;
}

export const getUserProfile = async (
    id: number
  ): Promise<OrganizationsRequest> => {
    const path = `${ORGANIZATIONS}/${id}`;
    const httpRequest = httpClient(cienciaArgentinaHost);
    const { data } = await httpRequest.get<OrganizationsRequest>(path);
    return data;
  };

  export const postOrganization = async (): Promise<OrganizationsRequest> => {
    const path = `${ORGANIZATIONS}`;
    const httpRequest = httpClient(cienciaArgentinaHost);
    const { data } = await httpRequest.post<OrganizationsRequest>(path);
    return data;
  };
