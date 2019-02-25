import React from 'react'

export enum Theme {
  Light = 'theme--light',
  Dark = 'theme--dark'
}

export interface ThemeProps {
  collapsed: boolean
  toggleCollapsed: () => void
  theme: Theme
  toggleTheme: () => void
}

// tslint:disable-next-line: variable-name
export const ThemeContext = React.createContext<ThemeProps>({
  theme: Theme.Light,
  collapsed: false,
  toggleCollapsed: () => ({}),
  toggleTheme: () => ({})
})
