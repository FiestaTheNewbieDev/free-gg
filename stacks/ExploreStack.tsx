import { createStackNavigator } from '@react-navigation/stack'
import Details from '../pages/Details'
import Explore from '../pages/Explore'

const Stack = createStackNavigator()

export default function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ExploreScreen" component={Explore} />
      <Stack.Screen name="DetailsScreen" component={Details} />
    </Stack.Navigator>
  )
}
