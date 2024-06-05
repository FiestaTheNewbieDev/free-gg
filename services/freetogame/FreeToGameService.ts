import { Platform } from '../../enums/Platform'
import { Category } from '../../enums/Category'
import { SortMethod } from '../../enums/SortMethod'
import { freetogame } from '../ServiceHelper'

export const fetchGames = async (
  platform: Platform | null = null,
  category: Category | null = null,
  sortMethod: SortMethod | null = null
) => {
  let route = '/games'
  const params = new URLSearchParams()
  if (platform) {
    params.append('platform', platform)
  }
  if (category) {
    params.append('category', category)
  }
  if (sortMethod) {
    params.append('sort-by', sortMethod)
  }
  route += `?${params.toString()}`
  return await freetogame.get(route)
}

export const fetchById = async (id: number) => {
  return await freetogame.get(`/game?id=${id}`)
}
