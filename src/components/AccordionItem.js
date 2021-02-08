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
  order,
  order: { order_id, items },
  index,
  itemCount,
  status,
  orderType,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <OrderComponent
        orderId={order_id}
        items={itemCount}
        status={status}
        orderType={orderType}
        index={index}
      />
      <View style={styles.positionBox}>
        {['D12', 'D13', 'D14'].map((itm, i) => (
          <StatusPill
            key={i}
            backgroundColor="#C5B171"
            marginRight={5}
            text={itm}
            paddingVertical={5}
            textStyle={Typography.bold13White}
          />
        ))}
      </View>
      <FlatList
        data={items}
        style={styles.orderItemsList}
        keyExtractor={(item) => `${item._id}`}
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
                    {item.department} {item.position}
                  </Text>
                </View>
              </View>
              <RightCaretSVG style={styles.rightIcon} />
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
