import { View, Text } from 'react-native';
import React from 'react';

interface IProps {
  horizontal?: number
  vertical?: number
  children: JSX.Element | JSX.Element[]
}

const Padding: React.FC<IProps> = ({horizontal = 0, vertical = 0, children}) => {
  return (
    <View
      className={`flex w-full items-center justify-center px-[${horizontal}px] py-[${horizontal}px]`}
    >
      {children}
    </View>
  );
};


export default Padding;