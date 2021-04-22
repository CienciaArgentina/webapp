import { StoreState } from "@store/index"
import { useSelector } from "react-redux"
import { RolInterface } from '@api/user_profiles'
import { MissingClaimException, NoProfileException, NotLoggedException } from "./exceptions"

const getClaimsFromRoles = (roles:RolInterface[]):string[] => {
	const claims2D = roles.map( rol => rol.claims.map(rol => rol.description) )
	const arrReducer = (acc:string[], curr:string[]):string[] => [...acc, ...curr]
	return claims2D.reduce(arrReducer)
}

type requestedClaim = string | string[]
export const hasClaim = (requestedClaim:requestedClaim):boolean => {
	const userState = useSelector((state:StoreState) => state.user)
	if(!userState.is_logged) { return false }
	const userClaims = getClaimsFromRoles(userState.auth.roles)
	if(typeof requestedClaim === 'string') {
		return userClaims.includes(requestedClaim)
	} else {
		requestedClaim.forEach( claim => {
			if( userClaims.includes(claim) ) return true
		} )
		return false
	}
}

export const validateHasClaim = (requestedClaim:requestedClaim):void => {
	if(!hasClaim(requestedClaim)) throw new MissingClaimException( typeof requestedClaim==='string' ? requestedClaim : undefined )
}

export const userLogged = (withProfile:boolean=true):boolean => {
	const userState = useSelector((state:StoreState) => state.user)
	if( !userState.is_logged ) return false
	if(withProfile) return userState.profile.completed_profile
	return true
}

export const validateUserLogged = (withProfile:boolean=true):void => {
	const userState = useSelector((state:StoreState) => state.user)
	if( !userState.is_logged ) throw new NotLoggedException()
	if(withProfile && !userState.profile.completed_profile) throw new NoProfileException();
}