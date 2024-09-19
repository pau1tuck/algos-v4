export interface UserData {
	first_name: string;
	last_name: string;
	email: string;
}

export enum UserRole {
	Admin = "admin",
	Guest = "guest",
	Member = "member",
	Subscriber = "subscriber",
}
