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
import Divider from './Divider';
import OrderComponent from './OrderComponent';
import StatusPill from './StatusPill';
import TickComponent from './TickComponent';

const AccordionItem = ({
  order: { id, items, time_slot, binsAssigned },
  index,
  itemCount,
  status,
  orderType,
  onPress,
}) => {
  const now = Date.now();
  time_slot = time_slot ? time_slot : { start_time: now, end_time: now };
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
      />
      <View style={styles.positionBox}>
        {binsAssigned &&
          binsAssigned.map((itm, i) => (
            <StatusPill
              key={i}
              backgroundColor="#C5B171"
              marginRight={5}
              text={itm.id}
              paddingVertical={5}
              textStyle={Typography.bold13White}
            />
          ))}
      </View>
      <FlatList
        data={items}
        style={styles.orderItemsList}
        keyExtractor={(item, indx) => `${indx}`}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={onPress ? () => onPress(item) : () => {}}
            disabled={!onPress}>
            <View style={styles.orderItem}>
              <View style={styles.departmentBox}>
                <TickComponent enabled={true} />
                <View>
                  <Text style={Typography.bold15}>
                    {item.qty}x {item.name}
                  </Text>
                  <Text style={Typography.normal12}>
                    {item.department} | {item.position}
                  </Text>
                </View>
              </View>
              {/* <RightCaretSVG style={styles.rightIcon} /> */}
            </View>
          </TouchableOpacity>
        )}
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
  positionBox: { flexDirection: 'row', marginBottom: 10 },
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
});

export default AccordionItem;
