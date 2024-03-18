import { createContext, useContext, useState } from "react"

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState('light');

    const changeMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
    return(
        <ThemeContext.Provider value={[theme, changeMode]}>
            {children}
        </ThemeContext.Provider>
    )
}