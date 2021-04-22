import { MyProfileInterface } from "@utils/api/user_profiles";
import { SET_USER_LOGGED, SET_USER_NOT_LOGGED, SetUserLoggedAction, SetUserNotLoggedActon } from "./user.types";


export function setUserLogged({profile, auth}: MyProfileInterface): SetUserLoggedAction {
	return {
		type: SET_USER_LOGGED,
		is_logged: true,
		profile,
		auth
	}
}

export function setUserNotLogged (): SetUserNotLoggedActon {
	return {
		type: SET_USER_NOT_LOGGED,
		is_logged: false,
		profile: null,
		auth: null
	}
}