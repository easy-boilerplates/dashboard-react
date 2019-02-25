import { createLocalStore } from 'client/utils/create-local-store'

export const authStore = createLocalStore<boolean>('auth')
