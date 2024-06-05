import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomModal from '../components/CustomModal'
import CustomView from '../components/CustomView'
import GameCard from '../components/GameCard'
import RootContext from '../contexts/RootContext'
import IGame from '../interfaces/IGame'
import globalStyle from '../styles/globalStyle'

export default function Explore({ navigation }) {
  const { games } = React.useContext(RootContext)

  const [displayedGames, setDisplayedGames] = React.useState<IGame[]>([])
  const [categoryModal, setCategoryModal] = React.useState(false)

  const windowHeight = Dimensions.get('window').height

  React.useEffect(() => {
    if (games.length > 0) {
      setDisplayedGames(games)
    }
  }, [games])

  const search = (text: string) => {
    if (text.trim().length < 1) {
      setDisplayedGames(games)
    } else {
      setDisplayedGames(games.filter((game) => game.title.toLowerCase().includes(text.toLowerCase())))
    }
  }

  return (
    <CustomView
      style={style.container}
      headerStyle={[globalStyle.header, style.header]}
      contentStyle={style.content}
      headerContent={
        <>
          <Text style={globalStyle.h1}>Explore</Text>
        </>
      }
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <View
          style={{ marginBottom: 10, backgroundColor: '#463f71', padding: 5, borderRadius: 20, width: '100%', flex: 1 }}
        >
          <View style={{ position: 'absolute', right: 10, top: 10 }}>
            <FontAwesomeIcon icon={faSearch} size={16} color={'white'} />
          </View>
          <TextInput
            style={{ overflow: 'hidden', paddingRight: 30, paddingLeft: 10 }}
            onChangeText={(text) => search(text)}
          />
        </View>
        <TouchableOpacity onPress={() => setCategoryModal(true)}>
          <View style={{ backgroundColor: '#463f71', padding: 10, borderRadius: 10, marginLeft: 10 }}>
            <FontAwesomeIcon icon={faFilter} size={16} color={'white'} />
          </View>
        </TouchableOpacity>
        <CustomModal visible={categoryModal} setVisible={setCategoryModal}>
          <Text>test</Text>
        </CustomModal>
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        data={displayedGames}
        renderItem={({ item }) => {
          return (
            <GameCard
              onPress={() => navigation.navigate('DetailsScreen', { gameID: item.id })}
              height={windowHeight / 4}
              game={item}
            />
          )
        }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </CustomView>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#303030'
  },
  header: {},
  content: { paddingHorizontal: 20 }
})
