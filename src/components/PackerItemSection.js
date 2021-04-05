import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, width } from '../styles';
import Arrow from './Arrow';
import StatusPill from './StatusPill';

const w = width - 32;
const PackerItemSection = ({
  title,
  price,
  quantity,
  position,
  department,
  status,
  type,
  start_time,
  img,
  end_time,
  locale,
}) => {
  return (
    <>
      <View style={styles.itemImageContainer}>
        <View style={styles.itemImage}>
          <Image
            source={{ uri: img }}
            resizeMode={'contain'}
            style={{ height: (1 * w) / 2, width: width - 64 }}
          />
        </View>
      </View>
      <View style={styles.itemContentBox}>
        <View style={styles.itemContentSubBox}>
          {(position || department) && (
            <View style={styles.statusBox}>
              {position && (
                <StatusPill
                  backgroundColor="#A1C349"
                  text={position}
                  marginRight={10}
                />
              )}
              {department && (
                <StatusPill backgroundColor="#C5B171" text={department} />
              )}
            </View>
          )}
          <View style={styles.itemBox}>
            <View style={styles.itemTitleBox}>
              <Text style={Typography.bold21}>{title}</Text>
              <Text style={Typography.normal15}>{status}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={Typography.bold21}>
                AED {price ? price?.toFixed(2) : 0}
              </Text>
              <Text>{locale?.IS_perQuantity}</Text>
            </View>
          </View>
          <View style={styles.timeBox}>
            <View style={styles.historyBox}>
              <View style={styles.orderTypeBox}>
                <View style={styles.deliveryStatusCircle} />
                <Text style={Typography.bold15}>{'Scheduled delivery'}</Text>
                {/*mock orderType*/}
              </View>
              <View style={styles.deliverBoxRow2}>
                <Text>{start_time}</Text>
                <Arrow />
                {/* <Text> ------------> </Text> */}
                <Text>{end_time}</Text>
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
  itemImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    height: (1 * w) / 2,
    width: width - 64,
    borderRadius: 7,
    overflow: 'hidden',
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
  itemContentBox: { flexDirection: 'row', marginHorizontal: 32 },
  itemContentSubBox: { flex: 1 },
  statusBox: { flexDirection: 'row' },
  itemBox: { flexDirection: 'row', marginVertical: 10 },
  itemTitleBox: { flex: 1 },
  priceBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderTypeBox: { flexDirection: 'row', alignItems: 'center' },
});
export default PackerItemSection;
