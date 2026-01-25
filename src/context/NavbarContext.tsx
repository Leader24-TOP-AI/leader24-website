'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface NavbarContextType {
  forceDarkText: boolean
  setForceDarkText: (value: boolean) => void
}

const NavbarContext = createContext<NavbarContextType>({
  forceDarkText: false,
  setForceDarkText: () => {}
})

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [forceDarkText, setForceDarkText] = useState(false)
  return (
    <NavbarContext.Provider value={{ forceDarkText, setForceDarkText }}>
      {children}
    </NavbarContext.Provider>
  )
}

export const useNavbarContext = () => useContext(NavbarContext)
