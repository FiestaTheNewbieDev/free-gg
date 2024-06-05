import React from 'react'
import { Dimensions, Image, TouchableOpacity } from 'react-native'
import CustomModal from './CustomModal'

export default function ImageModal({ image }) {
  const [visible, setVisible] = React.useState(false)

  const windowWidth = Dimensions.get('window').width

  return (
    <>
      <TouchableOpacity>
        <Image source={{ uri: image }} style={{ width: windowWidth, objectFit: 'cover' }} />
      </TouchableOpacity>
      <CustomModal visible={visible} setVisible={setVisible}>
        <Image source={{ uri: image }} style={{ width: windowWidth, objectFit: 'cover' }} />
      </CustomModal>
    </>
  )
}
