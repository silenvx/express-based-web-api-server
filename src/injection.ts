import { useInMemoryUserAPI } from "@adapter/repository/users"
import { User } from "@domain/user"

export const useListUser = () => {
    const deps = {
        api: useInMemoryUserAPI
    }
    return () => deps.api.list()
}

export const useFindUser = () => {
    const deps = {
        api: useInMemoryUserAPI
    }
    return (name: string) => deps.api.find(name)
}

export const useCreateUser = () => {
    const deps = {
        api: useInMemoryUserAPI
    }
    return (user: User) => deps.api.create(user)
}
