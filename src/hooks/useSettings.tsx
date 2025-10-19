'use client'
// for theme toggle button 
import { useContext } from 'react'
import { SettingsContext } from '@/contexts/settingsContext'

// Custom hook to access theme settings
export function useSettings() {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}
