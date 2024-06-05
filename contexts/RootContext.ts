import React from 'react'
import { Platform } from '../enums/Platform'
import IGame from '../interfaces/IGame'

export interface IRootContext {
  games: IGame[]
  setGames: (games: IGame[]) => void
  favoritePlatform: Platform
  setFavoritePlatform: (platform: Platform) => void
}

const defaultValues: IRootContext = {
  games: [],
  setGames: () => {},
  favoritePlatform: Platform.ALL,
  setFavoritePlatform: () => {}
}

const RootContext = React.createContext<IRootContext>(defaultValues)

export default RootContext
