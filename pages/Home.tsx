import React from 'react'
import { StyleSheet, Text } from 'react-native'
import CustomScrollView from '../components/CustomScrollView'
import GamesCarousel from '../components/GamesCarousel'
import RootContext from '../contexts/RootContext'
import IGame from '../interfaces/IGame'
import globalStyle from '../styles/globalStyle'

export default function Home({ navigation }) {
  const { games } = React.useContext(RootContext)

  const [randomGames, setRandomGames] = React.useState<IGame[]>([])
  const [latestReleases, setLatestReleases] = React.useState<IGame[]>([])
  const [ourSelection, setOurSelection] = React.useState<IGame[]>([])

  function updateRandomGames() {
    return new Promise((resolve) => {
      setRandomGames([])
      for (let i = 0; i < 10; i++) {
        let index = Math.floor(Math.random() * games.length)
        while (randomGames.includes(games[index])) index = Math.floor(Math.random() * games.length)
        setRandomGames((prev) => [...prev, games[index]])
      }
      resolve('done')
    })
  }

  React.useEffect(() => {
    if (games.length > 0) {
      updateRandomGames()
      setOurSelection(
        [540, 516, 474, 506, 30, 66, 8, 104, 184, 192, 204, 12, 24, 257, 426, 16, 251]
          .map((id) => games.find((game: IGame) => game.id === id))
          .filter((game): game is IGame => game !== undefined)
      )
      setLatestReleases(games.slice(0, 9))
    }
  }, [games])

  const [refreshing, setRefreshing] = React.useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    updateRandomGames().then(() => setRefreshing(false))
  }

  return (
    <CustomScrollView
      style={style.container}
      headerStyle={[globalStyle.header, style.header]}
      contentStyle={style.content}
      headerContent={
        <>
          <Text style={globalStyle.h1}>Home</Text>
        </>
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      <Text style={[globalStyle.h2, { marginHorizontal: 20 }]}>Let's discover!</Text>
      {randomGames.length > 0 ? <GamesCarousel navigation={navigation} games={randomGames} /> : <></>}
      <Text style={[globalStyle.h2, { marginHorizontal: 20 }]}>Our Selection</Text>
      {ourSelection.length > 0 ? <GamesCarousel navigation={navigation} games={ourSelection} /> : <></>}
      <Text style={[globalStyle.h2, { marginHorizontal: 20 }]}>Latest Releases</Text>
      {latestReleases.length > 0 ? <GamesCarousel navigation={navigation} games={latestReleases} /> : <></>}
    </CustomScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#303030'
  },
  header: {},
  content: {}
})
