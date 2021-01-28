import FontAwesomeI from 'react-native-vector-icons/FontAwesome';
import EntypoI from 'react-native-vector-icons/Entypo';
import IoniconsI from 'react-native-vector-icons/Ionicons';
import FeatherI from 'react-native-vector-icons/Feather';
import FontAwesome5I from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignI from 'react-native-vector-icons/AntDesign';
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons';
import FoundationI from 'react-native-vector-icons/Foundation';
import FontistoI from 'react-native-vector-icons/Fontisto';
import SimpleLineIconsI from 'react-native-vector-icons/SimpleLineIcons';

import React from 'react';

const FontAwesome = (props) => <FontAwesomeI {...props} />;
const Ionicons = (props) => <IoniconsI {...props} />;
const Entypo = (props) => <EntypoI {...props} />;
const Feather = (props) => <FeatherI {...props} />;
const FontAwesome5 = (props) => <FontAwesome5I {...props} />;
const MaterialCommunityIcons = (props) => (
  <MaterialCommunityIconsI {...props} />
);
const AntDesign = (props) => <AntDesignI {...props} />;
const MaterialIcons = (props) => <MaterialIconsI {...props} />;
const Foundation = (props) => <FoundationI {...props} />;
const Fontisto = (props) => <FontistoI {...props} />;
const SimpleLineIcons = (props) => <SimpleLineIconsI {...props} />;

export {
  FontAwesome,
  Ionicons,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Foundation,
  Fontisto,
  SimpleLineIcons,
};
