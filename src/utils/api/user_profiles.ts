import { httpClient, cienciaArgentinaHost, cienciaArgentinaRequest } from 'utils/httpClient';

const USER_PROFILES = "/user_profiles"

interface UserProfileRequest {
    id?: number;
    name?: string;
    username?: string;
    lastname?: string;
    birthdate?: Date;
    email?: string;
    sex_type?: string;
    education?: EducationRequest[] | null;
    job_experience?: JobExperienceRequest[] | null;
}

interface EducationRequest {
    user_education_type_id?: number;
    date_start?: Date;
    date_end?: Date;
    institution?: string;
    additional?: string;
}

interface JobExperienceRequest {
    date_start?: Date;
    date_end?: Date;
    institution_name?: string;
    description?: string;
    additions?: string;
}

export const getUserProfile = async (
    userId: number
  ): Promise<UserProfileRequest> => {
    const path = `${USER_PROFILES}/${userId}`;
    const httpRequest = httpClient(cienciaArgentinaHost);
    const { data } = await httpRequest.get<UserProfileRequest>(path);
    return data;
  };

  export const updateUserProfile = async (
    userId: number
  ): Promise<UserProfileRequest> => {
    const path = `${USER_PROFILES}/${userId}`;
    const httpRequest = httpClient(cienciaArgentinaHost);
    const { data } = await httpRequest.put<UserProfileRequest>(path);
    return data;
  };

  interface ClaimInterface {
    id: number
    description: string
  }
  
  interface RolInterface {
    id: number
    description: number
    claims: ClaimInterface[]
  }
 /**
  * TODO:
  * 1 Completed / incompleted vesion que si es completed, name es string, sino, null.
  * 2 Unificar los permisios en una sola variable de permisos.
  * 3 Funcion para verificar que tengo un permiso desde redux.
  * 4 Reemplazar todos los httpClient() por cienciaArgentinaRequest para unificar jwt en todos.
 */ 
  export interface MyProfileInterface {
    user: {
        id: number,
        username: string,
        name: string | null,
        last_name: string | null,
        birthdate: string | null,
        email: string,
        sex: string | null,
        education: [],
        job_experience: []
    },
    auth: {
        auth_id: number,
        email: string,
        roles: RolInterface,
        timestamp: number
    }
  }

  export const getMyProfile = async (): Promise<MyProfileInterface> => {
    const path = `${USER_PROFILES}/me`;
    const { data } = await cienciaArgentinaRequest.get<MyProfileInterface>(path);
    return data
  }