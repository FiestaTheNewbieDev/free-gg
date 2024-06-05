import React from 'react'
import { Animated, RefreshControl, ScrollView, View } from 'react-native'

export default function CustomScrollView({
  style,
  headerStyle,
  contentStyle,
  headerContent,
  children,
  refreshing,
  onRefresh
}: {
  style?: any
  headerStyle?: any
  contentStyle?: any
  headerContent?: React.ReactNode
  children?: React.ReactNode
  refreshing?: boolean
  onRefresh?: () => void
}) {
  if (refreshing !== undefined && onRefresh !== undefined) {
    return (
      <View style={[style, { flex: 1 }]}>
        <Animated.View style={headerStyle}>{headerContent}</Animated.View>
        <ScrollView
          style={contentStyle}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {children}
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View style={[style, { flex: 1 }]}>
        <Animated.View style={headerStyle}>{headerContent}</Animated.View>
        <ScrollView style={contentStyle}>{children}</ScrollView>
      </View>
    )
  }
}
