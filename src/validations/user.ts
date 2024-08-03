import { error, ErrorObject, noError } from "@domain/error";
import { User } from "@domain/user";
export const validationUser = (user: Partial<User>): ErrorObject => {
    if (!user.name) {
        return error("User name is required.");
    }
    if (!user.role) {
        return error("User role is required.");
    }
    return noError();
}
