import React from 'react'
import { StyleSheet, Text } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import CustomScrollView from '../components/CustomScrollView'
import RootContext from '../contexts/RootContext'
import { Platform } from '../enums/Platform'
import globalStyle from '../styles/globalStyle'

export default function Settings() {
  const { favoritePlatform, setFavoritePlatform } = React.useContext(RootContext)

  const [checked, setChecked] = React.useState({
    PC: favoritePlatform === Platform.PC,
    Browser: favoritePlatform === Platform.BROWSER,
    All: favoritePlatform === Platform.ALL
  })

  React.useEffect(() => {
    switch (favoritePlatform) {
      case Platform.PC:
        setChecked({ PC: true, Browser: false, All: false })
        break
      case Platform.BROWSER:
        setChecked({ PC: false, Browser: true, All: false })
        break
      case Platform.ALL:
        setChecked({ PC: false, Browser: false, All: true })
        break
    }
  }, [favoritePlatform])

  return (
    <CustomScrollView
      style={style.container}
      headerStyle={[globalStyle, style.header]}
      contentStyle={style.content}
      headerContent={
        <>
          <Text style={globalStyle.h1}>Settings</Text>
        </>
      }
    >
      <Text style={globalStyle.h2}>Favorite Platform</Text>
      <BouncyCheckbox
        iconStyle={{ marginRight: 10 }}
        size={16}
        fillColor="white"
        textComponent={<Text style={{ color: 'white' }}>PC</Text>}
        isChecked={checked.PC}
        onPress={() => setFavoritePlatform(Platform.PC)}
        disableBuiltInState={true}
      />
      <BouncyCheckbox
        iconStyle={{ marginRight: 10 }}
        size={16}
        fillColor="white"
        textComponent={<Text style={{ color: 'white' }}>Browser</Text>}
        isChecked={checked.Browser}
        onPress={() => setFavoritePlatform(Platform.BROWSER)}
        disableBuiltInState={true}
      />
      <BouncyCheckbox
        iconStyle={{ marginRight: 10 }}
        size={16}
        fillColor="white"
        textComponent={<Text style={{ color: 'white' }}>All</Text>}
        isChecked={checked.All}
        onPress={() => setFavoritePlatform(Platform.ALL)}
        disableBuiltInState={true}
      />
    </CustomScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#303030'
  },
  header: {},
  content: {
    padding: 20
  }
})
