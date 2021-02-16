import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import { Colors } from '../../styles';

const Browser = ({
  route: {
    params: { src },
  },
  navigation,
}) => {
  const openLink = async () => {
    if (src.indexOf('external.') > -1) {
      const url = src.split('external.')[1];
      await Linking.openURL('https://' + url);
    }
  };
  useEffect(() => {
    openLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (src.indexOf('external.') > -1) {
    return <Loader fullScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={styles.closeView}>
          <Icon name="close" color={Colors.primary4} size={20} />
        </View>
      </TouchableOpacity>
      <Divider />
      <WebView
        style={styles.container}
        startInLoadingState
        pullToRefreshEnabled
        renderLoading={() => <Loader />}
        source={{
          uri: src,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  closeView: {
    height: 60,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
});
export default Browser;
