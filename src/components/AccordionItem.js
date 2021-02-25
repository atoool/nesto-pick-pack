import React from 'react';
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
import Button from './Button';
import Divider from './Divider';
import OrderComponent from './OrderComponent';
import StatusPill from './StatusPill';
import TickComponent from './TickComponent';

const now = Date.now();
const AccordionItem = ({
  order: {
    id,
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
}) => {
  time_slot = time_slot
    ? userType === 'packer'
      ? { start_time: order_start_time, end_time: order_end_time }
      : time_slot
    : { start_time: now, end_time: now };
  return (
    <View style={styles.container}>
      <OrderComponent
        orderId={id}
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
          binsAssigned.map((itm, i) => (
            <View key={i} style={styles.statusPill}>
              <StatusPill
                backgroundColor="#C5B171"
                marginRight={5}
                text={itm.bin_number}
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
          keyExtractor={(item, indx) => `${indx}${item.id}`}
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
                        ? item.packer_checked
                        : item.picker_checked
                    }
                  />
                  <View style={styles.textBox}>
                    <Text style={styles.itemTitle}>
                      {item.qty ? item.qty : 1}x{' '}
                      {item.name ? item.name : Constants.emptyItemName}
                    </Text>
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
      {showReadyButton && (
        <Button
          title={buttonTitle}
          style={styles.button}
          loading={readyButtonLoading === index}
          onPress={() => {
            onReadyPress && onReadyPress(id, index);
          }}
        />
      )}
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
  positionBox: { flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap' },
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
  textBox: { width: '75%' },
  itemText: { ...Typography.normal12, flexWrap: 'wrap' },
});

export default AccordionItem;
