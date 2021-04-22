export class NoProfileException extends Error {
	constructor() {
		super('User profile is missing.');
		this.name = "NoProfileException";
	}
}

export class NotLoggedException extends Error {
	constructor() {
		super('User is not logged in.');
		this.name = "NotLogged";
	}
}

export class MissingClaimException extends Error {
	constructor(claim:string|undefined = undefined) {
		super(claim ? `User is missing the ${claim} claim.` : 'User is missing a required claim.');
		this.name = "MissingClaim";
	}
}

export class MissingRolException extends Error {
	constructor(rol:string|undefined = undefined) {
		super(rol ? `User is missing the ${rol} rol.` : 'User is missing a required rol.');
		this.name = "MissingRol";
	}
}