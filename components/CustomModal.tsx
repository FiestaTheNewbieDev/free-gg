import { Modal, StyleSheet, View } from 'react-native'

export default function CustomModal({ visible, setVisible, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => setVisible(!visible)}>
      <View style={style.overlay}>{children}</View>
    </Modal>
  )
}

const style = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
