import { View, Text } from 'react-native';
import React from 'react';

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

const ModalContent: React.FC<IProps> = ({children}) => {
  return (
    <View className="flex py-[35px] items-center justify-center">
      {children}
    </View>
  )
};

export default ModalContent;