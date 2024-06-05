import Ionicons from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import RootContext from './contexts/RootContext'
import { Platform } from './enums/Platform'
import { SortMethod } from './enums/SortMethod'
import IGame from './interfaces/IGame'
import Home from './pages/Home'
import Settings from './pages/Settings'
import { fetchGames } from './services/freetogame/FreeToGameService'
import ExploreStack from './stacks/ExploreStack'

const Stack = createBottomTabNavigator()

export default function App() {
  const [games, setGames] = React.useState<IGame[]>([])
  const [favoritePlatform, setFavoritePlatform] = React.useState<Platform>(Platform.ALL)

  React.useEffect(() => {
    fetchGames(favoritePlatform, null, SortMethod.REALEASE_DATE).then((response) => {
      setGames(response.data)
    })
  }, [favoritePlatform])

  const contextValue = {
    games,
    setGames,
    favoritePlatform,
    setFavoritePlatform
  }

  return (
    <RootContext.Provider value={contextValue}>
      <StatusBar barStyle={'default'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case 'HomeScreen':
                  return focused ? (
                    <Ionicons name="home" size={size} color={color} />
                  ) : (
                    <Ionicons name="home-outline" size={size} color={color} />
                  )
                case 'ExploreStack':
                  return focused ? (
                    <Ionicons name="search" size={size} color={color} />
                  ) : (
                    <Ionicons name="search-outline" size={size} color={color} />
                  )
                case 'Settings':
                  return focused ? (
                    <Ionicons name="settings" size={size} color={color} />
                  ) : (
                    <Ionicons name="settings-outline" size={size} color={color} />
                  )
                default:
                  return focused ? (
                    <Ionicons name="square" size={size} color={color} />
                  ) : (
                    <Ionicons name="square-outline" size={size} color={color} />
                  )
              }
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            headerShown: false,
            tabBarLabel: () => null,
            tabBarStyle: style.navbar
          })}
        >
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="ExploreStack" component={ExploreStack} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootContext.Provider>
  )
}

const style = StyleSheet.create({
  navbar: {
    backgroundColor: '#463f71'
  }
})
