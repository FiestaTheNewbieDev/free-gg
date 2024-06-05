import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomScrollView from '../components/CustomScrollView'
import ImageModal from '../components/ImageModal'
import IGame from '../interfaces/IGame'
import { fetchById } from '../services/freetogame/FreeToGameService'
import globalStyle from '../styles/globalStyle'

export default function Details({ navigation, route }) {
  const { gameID } = route.params

  const [game, setGame] = React.useState<IGame>({} as IGame)

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  React.useEffect(() => {
    fetchById(gameID).then((response) => setGame(response.data))
  }, [gameID])

  return (
    <CustomScrollView
      style={style.container}
      headerStyle={[globalStyle.header, style.header]}
      headerContent={
        <>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{game.title}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ExploreScreen')}>
            <FontAwesomeIcon icon={faX} size={20} color="white" />
          </TouchableOpacity>
        </>
      }
      contentStyle={style.content}
    >
      <Image source={{ uri: game.thumbnail }} style={{ width: '100%', aspectRatio: 2, marginBottom: 10 }} />
      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <Text style={{ color: 'grey' }}>
          Developer <Text style={{ color: 'white', fontWeight: 'bold' }}>{game.developer}</Text>
        </Text>
        <Text style={{ color: 'grey' }}>
          Publisher <Text style={{ color: 'white', fontWeight: 'bold' }}>{game.publisher}</Text>
        </Text>
        <Text style={{ color: 'grey' }}>
          Release Date <Text style={{ color: 'white', fontWeight: 'bold' }}>{game.release_date}</Text>
        </Text>
      </View>
      {game.screenshots ? (
        <ScrollView horizontal={true} style={{ width: '100%', aspectRatio: 2, marginVertical: 10 }}>
          {game.screenshots?.map((screenshot) => <ImageModal key={screenshot.id} image={screenshot.image} />)}
        </ScrollView>
      ) : (
        <></>
      )}
      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <Text style={globalStyle.text}>{game.description}</Text>
      </View>
    </CustomScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#303030'
  },
  header: {
    backgroundColor: '#463f71',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {}
})
