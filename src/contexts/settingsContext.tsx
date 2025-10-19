'use client'
// for theme toggle button 
import React, { createContext, useState, useContext } from 'react'

// Define the types
export type Mode = 'light' | 'dark' | 'system'
interface Settings {
    mode: Mode
    theme: {
        styles?: {
            light?: Record<string, any>
            dark?: Record<string, any>
        }
    }
}

interface SettingsContextType {
    settings: Settings
    updateSettings: (newSettings: Settings) => void
}

// Default settings
const defaultSettings: Settings = {
    mode: 'light',
    theme: { styles: { light: {}, dark: {} } },
}

// Create context
export const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

// Provider component
export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(defaultSettings)

    const updateSettings = (newSettings: Settings) => {
        setSettings(newSettings)
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}
