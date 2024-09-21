import {useAuthStore} from "@/stores/auth.store"
import {ROLES_CONSTANTS} from "@/constants/RolesConstants.js";

const authStore = useAuthStore()

export function usePermission() {
    const hasPermission = (code) => {
        if (hasRole(ROLES_CONSTANTS.SUPER_ADMINISTRADOR.name)) {
            return true
        }
        return authStore?.user?.roles[0].permissions.find(permission => permission.name === code)
    }
    const hasRole = (name) => {
        return authStore?.user?.roles[0].name === name
    }

    return {
        hasPermission,
        hasRole
    }
}
