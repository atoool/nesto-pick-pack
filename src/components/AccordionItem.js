import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { RightCaretSVG } from '../assets/svg';
import { Colors, Typography } from '../styles';
import { Constants } from '../utils';
import getColorBin from '../utils/getColorBin';
import Button from './Button';
import Divider from './Divider';
import ModalComponent from './ModalComponent';
import OrderComponent from './OrderComponent';
import StatusPill from './StatusPill';
import TickComponent from './TickComponent';

const now = Date.now();
const AccordionItem = ({
  order: {
    id,
    sales_incremental_id,
    items,
    time_slot,
    binsAssigned,
    order_start_time,
    order_end_time,
  },
  index,
  itemCount,
  status,
  orderType,
  onPress,
  buttonTitle,
  onReadyPress,
  showReadyButton,
  userType,
  timeLeft = now,
  readyButtonLoading = false,
  locale,
}) => {
  time_slot = time_slot
    ? // ? userType === 'packer'
      //   ? { start_time: order_start_time, end_time: order_end_time }
      time_slot
    : { start_time: now, end_time: now };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <OrderComponent
        orderId={sales_incremental_id}
        items={itemCount}
        status={status}
        orderType={orderType}
        index={index}
        startTime={time_slot.start_time}
        endTime={time_slot.end_time}
        timeLeft={timeLeft}
      />
      <View style={styles.positionBox}>
        {binsAssigned &&
          binsAssigned?.map((itm, i) => (
            <View key={i} style={styles.statusPill}>
              <StatusPill
                backgroundColor={getColorBin(itm?.bin_number)}
                marginRight={5}
                text={itm?.bin_number}
                paddingVertical={5}
                textStyle={Typography.bold13White}
              />
            </View>
          ))}
      </View>
      {items?.length !== 0 && (
        <FlatList
          data={items}
          style={styles.orderItemsList}
          keyExtractor={(item, indx) => `${indx}${item?.id}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={onPress ? () => onPress(item) : () => {}}
              disabled={!onPress}>
              <View style={styles.orderItem}>
                <View style={styles.departmentBox}>
                  <TickComponent
                    enabled={
                      userType === 'packer'
                        ? item?.packer_checked
                        : item?.picker_checked
                    }
                  />
                  <View style={styles.textBox}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {userType !== 'packer' && (
                        <View
                          style={[
                            styles.deliveryStatusCircle,
                            {
                              backgroundColor: item.dfc
                                ? Colors[item?.dfc?.toLowerCase()]
                                  ? Colors[item.dfc.toLowerCase()]
                                  : Colors.chilled
                                : Colors.chilled,
                            },
                          ]}
                        />
                      )}
                      <Text style={styles.itemTitle}>
                        {item?.total_qty
                          ? item?.total_qty
                          : item.qty
                          ? item.qty
                          : 1}
                        x {item.name ? item.name : Constants.emptyItemName}
                      </Text>
                    </View>
                    <Text style={styles.itemText}>
                      {item?.department
                        ? item?.department
                        : Constants.emptyDepartment}{' '}
                      |{' '}
                      {item?.position
                        ? item?.position
                        : Constants.emptyPosition}
                    </Text>
                  </View>
                </View>
                {onPress && <RightCaretSVG style={styles.rightIcon} />}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <Button
        title={buttonTitle}
        disabled={
          !showReadyButton || (binsAssigned ? binsAssigned.length === 0 : true)
        }
        style={styles.button}
        loading={readyButtonLoading === index}
        onPress={() => {
          setModalVisible(true);
        }}
      />

      <ModalComponent
        visible={modalVisible}
        text={userType === 'packer' ? locale?.PS_confirm : locale?.DS_confirm}
        button1Text={locale?.no}
        button2Text={locale?.yes}
        onButton1Press={() => setModalVisible(false)}
        onButton2Press={() => {
          setModalVisible(false);
          onReadyPress && onReadyPress(id, index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 32, marginVertical: 20 },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
  },
  positionBox: { flexDirection: 'row', marginBottom: 5, flexWrap: 'wrap' },
  departmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: { marginRight: 20 },
  orderItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: { marginTop: 20 },
  statusPill: { marginBottom: 5 },
  itemTitle: { ...Typography.bold15, flexWrap: 'wrap' },
  textBox: { width: '70%' },
  itemText: { ...Typography.normal12, flexWrap: 'wrap' },
  deliveryStatusCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#889BFF',
    borderRadius: 14,
    marginRight: 10,
    marginTop: 1,
  },
});

export default AccordionItem;
