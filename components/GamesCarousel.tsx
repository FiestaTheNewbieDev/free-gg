import React, { useCallback } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import IGame from '../interfaces/IGame'
import GameCard from './GameCard'

export default function GamesCarousel({ games, navigation }: { games: IGame[]; navigation: any }) {
  const [index, setIndex] = React.useState(0)
  const indexRef = React.useRef(index)
  indexRef.current = index

  const windowHeight = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width

  const onScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width
    const index = event.nativeEvent.contentOffset.x / slideSize
    const roundIndex = Math.round(index)

    const distance = Math.abs(roundIndex - index)
    const isNoMansLand = distance > 0.4

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex)
    }
  }, [])

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((event: any) => event.id, []),
    getItemLayout: useCallback(
      (_: any, index: any) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth
      }),
      []
    )
  }

  return (
    <FlatList
      data={games}
      style={{ flex: 1 }}
      renderItem={({ item }) => {
        return (
          <View style={{ padding: 20, width: windowWidth }}>
            <GameCard
              height={windowHeight / 4}
              key={item.id}
              game={item}
              onPress={() =>
                navigation.navigate('ExploreStack', { screen: 'DetailsScreen', params: { gameID: item.id } })
              }
            />
          </View>
        )
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  )
}
