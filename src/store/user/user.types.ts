import { MyProfileInterface } from "@utils/api/user_profiles"

export type UserReducerState = {
	is_logged: true
	profile: MyProfileInterface['profile'],
	auth: MyProfileInterface['auth'],
} | {
	is_logged: false,
	profile: null,
	auth: null,
}

export const SET_USER_LOGGED = 'SET_USER_LOGGED'

export interface SetUserLoggedAction {
	type: typeof SET_USER_LOGGED,
	is_logged: true
	profile: MyProfileInterface['profile'],
	auth: MyProfileInterface['auth'],
}

export const SET_USER_NOT_LOGGED = 'SET_USER_NOT_LOGGED' 

export interface SetUserNotLoggedActon {
	type: typeof SET_USER_NOT_LOGGED,
	is_logged: false,
	profile: null,
	auth: null
}

export type UserActionTypes = SetUserLoggedAction | SetUserNotLoggedActon