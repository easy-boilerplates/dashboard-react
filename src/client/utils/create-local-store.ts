/**
 * it is localStorage simple wrapper
 * @param key
 * @returns {{resetData: (()=>void), setData: ((data:T)=>void), getData: (()=>T)}}
 */
export const createLocalStore = <T>(key: string): LocalStore<T> => ({
  resetData: () => localStorage.removeItem(key),
  setData: (data: T) => localStorage.setItem(key, JSON.stringify(data)),
  getData: (): T => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
})

interface LocalStore<T> {
  getData: () => T
  setData: (data: T) => void
  resetData: () => void
}
