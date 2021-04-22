import { httpClient, cienciaArgentinaHost, cienciaArgentinaRequest } from 'utils/httpClient';
import { DepartmentsInterface } from './departments';

const ORGANIZATIONS = "/organizations";

interface OrganizationsRequest {
    id?: number;
    name?: string;
    acronym?: string;
    summary?: string;
    description?: string;
    website?: string;
    organization_type?: string;
    departments?: DepartmentsInterface[] | null;
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

export interface OrganizationAddress {
  id: number
  date_created: string
  date_deleted: null | string
  street_name: string
  street_number: string
  zip_code: string
  additionals: null | string
  latitude: string
  longitude: string
  locality_id: number
}

export interface OrganizationInterface {
  id: number;
  name: string;
  acronym?: string;
  summary?: string;
  description?: string;
  website?: string;
  organization_type?: string;
  departments?: DepartmentsInterface[] | null;
  address: OrganizationAddress | null
}

export const getOrganization = async (id:number): Promise<OrganizationInterface> => {
  const path = `${ORGANIZATIONS}/${id}`;
  const response = await cienciaArgentinaRequest.get<OrganizationInterface>(path)
  return response.data;
};