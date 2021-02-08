import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Arrow from '../../components/Arrow';
import StatusPill from '../../components/StatusPill';
import { AppContext } from '../../context/AppContext';
import { Colors, Typography } from '../../styles';
import Images from '../../assets/images';
import Divider from '../../components/Divider';
import { PickerContext } from '../../context/PickerContext';
import RightCaretSVG from '../../assets/svg/RightCaretSVG.svg';

const screenWidth = Math.round(Dimensions.get('window').width);
const w = screenWidth - 32;

const SubstitutesScreen = ({
  route: {
    params: { item },
  },
  navigation,
}) => {
  const { similarItems, getSimilarItemList } = useContext(PickerContext);
  const onNavigateTo = () =>
    navigation.navigate('ItemScreen', {
      orderId: item.orderId,
      item,
    });

  useEffect(() => {
    getSimilarItemList(1);
    return () => {};
  }, []);
  console.warn(similarItems);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ItemSection
          title={item.name}
          price={item.price}
          quantity={item.qty}
          position={item.position}
          department={item.department}
          type="Express Delivery"
          status="Picking completed"
        />
        {similarItems && (
          <ItemCheckList items={similarItems} onNavigateTo={onNavigateTo} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const ItemSection = ({
  title,
  price,
  quantity,
  position,
  department,
  type,
  status,
}) => {
  const {
    locale: { locale },
  } = useContext(AppContext);

  return (
    <>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImage}>
          <Image
            source={Images.colgate}
            resizeMode={'contain'}
            style={{ height: (1 * w) / 2, width: screenWidth - 64 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <StatusPill
              backgroundColor="#A1C349"
              text={position}
              marginRight={10}
            />
            <StatusPill backgroundColor="#C5B171" text={department} />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={Typography.bold21}>{title}</Text>
              <Text style={Typography.normal15}>{status}</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <Text style={Typography.bold21}>${price}</Text>
              <Text> {locale?.IS_perQuantity}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.historyBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.deliveryStatusCircle} />
                <Text style={Typography.bold15}>{type}</Text>
              </View>
              <View style={styles.deliverBoxRow2}>
                <Text>9:00 AM</Text>
                <Arrow width={30} />
                {/* <Text> ------------> </Text> */}
                <Text>10:00 AM</Text>
              </View>
            </View>
            <View style={styles.quantityPill}>
              <Text style={Typography.bold13White}>x</Text>
              <Text style={Typography.bold20White}>{quantity}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const ItemCheckList = ({ items, onNavigateTo }) => {
  return (
    <>
      {items.map((item, index) => (
        <TouchableOpacity style={styles.orderItem} onPress={onNavigateTo}>
          <View>
            <View style={styles.itemTitleBox}>
              <View
                style={[
                  styles.deliveryStatusCircle,
                  {
                    backgroundColor:
                      item.dfc === 'chilled'
                        ? Colors.chilled
                        : Colors.secondaryRed,
                  },
                ]}
              />
              <Text style={Typography.bold15}>
                {item.qty}x {item.name}
              </Text>
            </View>
            <View style={styles.departmentBox}>
              <Text style={Typography.normal12}>
                {item.orderId} | {item.department} {item.position}
              </Text>
            </View>
            {item.assigned_bins && item.assigned_bins?.length !== 0 && (
              <View style={styles.positionBox}>
                {item.assigned_bins.map((itm, i) => (
                  <StatusPill
                    key={i}
                    backgroundColor={'#C5B171'}
                    marginRight={5}
                    text={itm}
                    paddingVertical={0}
                  />
                ))}
              </View>
            )}
          </View>
          <RightCaretSVG style={styles.rightIcon} />
        </TouchableOpacity>
      ))}
    </>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.WHITE },
  timerDivider: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.WHITE,
    opacity: 0.25,
  },
  timerContainer: {
    backgroundColor: Colors.secondaryRed,
    padding: 20,
    marginHorizontal: 32,
    marginVertical: 24,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemImageContainer: {
    marginHorizontal: 32,
    marginVertical: 24,
    alignItems: 'center',
  },
  itemImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    height: (1 * w) / 2,
    width: screenWidth - 64,
    borderRadius: 7,
  },
  deliveryStatusCircle: {
    width: 14,
    height: 14,
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
  },
  historyBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    height: 60,
    flex: 1,
  },
  quantityPill: {
    backgroundColor: Colors.secondaryRed,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 7,
    marginLeft: 10,
    height: 60,
  },
  flexDirectionRow: { flexDirection: 'row' },
  deliverBoxRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SubstitutesScreen;
