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

export interface ClaimInterface {
  id: number
  description: string
}

export interface RolInterface {
  id: number
  description: number
  claims: ClaimInterface[]
}
/**
 * TODO:
 * 2 Unificar los permisios en una sola variable de permisos.
 * 3 Funcion para verificar que tengo un permiso desde redux.
 * 4 Reemplazar todos los httpClient() por cienciaArgentinaRequest para unificar jwt en todos.
*/

type ProfileCommon = {
  id: number,
  username: string
  education: any[]
  job_experience: any[]
}

export interface CompletedUserProfile extends ProfileCommon {
  completed_profile: true
  name: string
  last_name: string
  sex: string,
  birthdate: string
}
export interface UncompletedUserProfile extends ProfileCommon {
  completed_profile: false
  name: null
  last_name: null
  sex: null
  birthdate: null
}

export type UserProfile = (CompletedUserProfile | UncompletedUserProfile)

export interface MyProfileInterface {
  profile: UserProfile,
  auth: {
    auth_id: number
    email: string
    roles: RolInterface[]
    timestamp: number
  }
}

const userMapper = (user: any): MyProfileInterface => {
  let data = {
    profile: user.user,
    auth: user.auth
  }
  data.profile.completed_profile = typeof user.user.name === 'string' ? true : false
  return data
}

export const getMyProfile = async (): Promise<MyProfileInterface> => {
  const path = `${USER_PROFILES}/me`;
  const { data } = await cienciaArgentinaRequest.get<any>(path);
  const user_data: MyProfileInterface = userMapper(data)
  return user_data
}