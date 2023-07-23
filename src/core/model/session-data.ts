import { Base } from "./base";
import type { User } from "./user";

export class SessionData extends Base{
    token?: string;
    user?:User;
}