import { httpClient, cienciaArgentinaHost } from 'utils/httpClient';

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