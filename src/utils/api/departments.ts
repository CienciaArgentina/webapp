import { httpClient, cienciaArgentinaHost } from 'utils/httpClient';

const DEPARTMENTS = "/departments"

export interface DepartmentsRequest {
    id?: number;
    name?: string;
    description?: string;
    website?: string;
    department_head?: string;
}