import React from 'react'
import { Animated, View } from 'react-native'

export default function CustomView({
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
        <View style={contentStyle}>{children}</View>
      </View>
    )
  } else {
    return (
      <View style={[style, { flex: 1 }]}>
        <Animated.View style={headerStyle}>{headerContent}</Animated.View>
        <View style={contentStyle}>{children}</View>
      </View>
    )
  }
}
