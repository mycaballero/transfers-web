'use strict'

const HEAVY_INVENTARIO_BASE_URL = import.meta.env.VITE_TRANSFERS_API_URL
const HEAVY_INVENTARIO_URL = `${HEAVY_INVENTARIO_BASE_URL}/api`

export const CITIES_URL = `${HEAVY_INVENTARIO_URL}/cities`
export const LOGOUT_URL = `${HEAVY_INVENTARIO_URL}/users/logout`
export const LOGIN_URL = `${HEAVY_INVENTARIO_URL}/users/sign-in`
export const OAUTH_CALLBACK_URL = `${HEAVY_INVENTARIO_URL}/auth`
export const PROFILE_URL = `${HEAVY_INVENTARIO_URL}/profile`
export const USER_URL = `${HEAVY_INVENTARIO_URL}/users`
export const PICKING_URL = `${HEAVY_INVENTARIO_URL}/pickings`
export const PICKING_LIST_URL = `${HEAVY_INVENTARIO_URL}/pickings/list`
export const NOTES_URL = `${HEAVY_INVENTARIO_URL}/notes`
export const OUTBOUND_URL = `${HEAVY_INVENTARIO_URL}/outbound`
export const PARTNER_URL = `${HEAVY_INVENTARIO_URL}/partners`
export const PRODUCT_URL = `${HEAVY_INVENTARIO_URL}/products`
export const LOCATION_URL = `${HEAVY_INVENTARIO_URL}/locations`
