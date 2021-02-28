import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Typography, width } from '../styles';
import formatAmPm from '../utils/formatAmPm';
import Arrow from './Arrow';
import StatusPill from './StatusPill';

const w = width - 32;

const ItemSection = ({
  title,
  price,
  quantity,
  position,
  department,
  type,
  status,
  startTime,
  endTime,
  img,
  locale,
}) => {
  const sTime = formatAmPm(startTime);
  const eTime = formatAmPm(endTime);
  return (
    <>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImageBox}>
          <Image
            source={{ uri: img }}
            resizeMode={'cover'}
            style={styles.itemImage}
          />
        </View>
      </View>
      <View style={styles.contentBox}>
        <View style={styles.subContentBox}>
          <View style={styles.statusPillBox}>
            <StatusPill
              backgroundColor="#A1C349"
              text={position}
              marginRight={10}
            />
            <StatusPill backgroundColor="#C5B171" text={department} />
          </View>
          <View style={styles.textContentBox}>
            <View style={styles.titleBox}>
              <Text style={Typography.bold21}>{title}</Text>
              <Text style={Typography.normal15}>{status}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={Typography.bold21}>${price}</Text>
              <Text> {locale?.IS_perQuantity}</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={styles.historyBox}>
              <View style={styles.rowBox}>
                <View style={styles.deliveryStatusCircle} />
                <Text style={Typography.bold15}>{'Scheduled delivery'}</Text>
                {/* mock orderType */}
              </View>
              <View style={styles.deliverBoxRow2}>
                <Text>{sTime}</Text>
                <Arrow width={60} />
                <Text>{eTime}</Text>
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

const styles = StyleSheet.create({
  itemImageContainer: {
    marginHorizontal: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  itemImage: { height: (1 * w) / 2, width: width - 64 },
  itemImageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    height: (1 * w) / 2,
    width: width - 64,
    borderRadius: 7,
    overflow: 'hidden',
  },
  contentBox: { flexDirection: 'row', marginHorizontal: 32 },
  subContentBox: { flex: 1 },
  statusPillBox: { flexDirection: 'row' },
  textContentBox: { flexDirection: 'row', marginVertical: 10 },
  titleBox: { flex: 1 },
  priceBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  rowBox: { flexDirection: 'row', alignItems: 'center' },
  historyBox: {
    backgroundColor: Colors.offWhite,
    padding: 10,
    borderRadius: 7,
    height: 60,
    flex: 1,
  },
  deliveryStatusCircle: {
    width: 14,
    height: 14,
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
  },
  deliverBoxRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default ItemSection;
