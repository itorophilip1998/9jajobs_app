import { View } from "react-native";
import { width, height } from "../utility/constant";

interface IProps {
  axis: "vertical" | "horizontal";
  value?: number;
}

const Spacer: React.FC<IProps> = ({ axis, value }) => {
  const style: any = [];
  if (axis == "vertical") {
    style.push({ width: width }, { height: value, width: "100%" });
  } else if (axis == "horizontal") {
    style.push({ height: height }, { width: value, height: "100%" });
  }
  return <View style={style}></View>;
};

export default Spacer;
