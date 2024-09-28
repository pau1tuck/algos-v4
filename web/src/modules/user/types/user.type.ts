//web/src/modules/user/types/user.type.ts
import type { PageProgress } from "@site/src/modules/quiz/types/page.types";
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
