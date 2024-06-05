import { faComputer, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import IGame from '../interfaces/IGame'

export default function GamesCarouselItem(props: { game: IGame; height: number; onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ backgroundColor: '#463f71', borderRadius: 20 }}>
        <Image
          source={{ uri: props.game.thumbnail }}
          style={{
            height: props.height,
            width: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}
        />
        {props.game.platform?.toLowerCase().includes('pc') ? (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: '#303030',
              borderRadius: 20,
              padding: 5
            }}
          >
            <FontAwesomeIcon icon={faComputer} size={24} color="white" />
          </View>
        ) : (
          <></>
        )}
        {props.game.platform?.toLowerCase().includes('browser') ? (
          <View
            style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'blue', borderRadius: 20, padding: 5 }}
          >
            <FontAwesomeIcon icon={faGlobe} size={24} color="white" />
          </View>
        ) : (
          <></>
        )}
        <Text style={{ fontSize: 16, margin: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
          {props.game.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
