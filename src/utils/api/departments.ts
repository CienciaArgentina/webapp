import { httpClient, cienciaArgentinaHost } from 'utils/httpClient';

const DEPARTMENTS = "/departments"

export interface DepartmentsInterface {
    id?: number;
    name?: string;
    description?: string;
    website?: string;
    department_head?: string;
}

export const getOrganization = async (id:number): Promise<OrganizationInterface> => {
    const path = `${DEPARTMENTS}/${id}`;
    const response = await cienciaArgentinaRequest.get<OrganizationInterface>(path)
    return response.data;
  };