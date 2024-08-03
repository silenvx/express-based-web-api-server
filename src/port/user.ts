import { User } from "@domain/user";

export interface UserAPI {
    list(): Promise<User[]>
    find(name: string): Promise<User>
    create(user: User): Promise<void>
}
