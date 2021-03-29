import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Typography } from '../styles';
import Divider from './Divider';
import TickComponent from './TickComponent';

const ItemCheckList = ({
  items,
  onPress,
  stock,
  checkedList,
  emptyText,
  loading,
}) => {
  return (
    <FlatList
      data={items}
      scrollEnabled={false}
      style={styles.orderItemsList}
      keyExtractor={(item, indx) => `${indx}${item.id}`}
      ListEmptyComponent={() =>
        loading ? (
          <ActivityIndicator
            style={styles.emptyChecklist}
            color={Colors.BLACK}
          />
        ) : (
          <Text style={styles.emptyChecklist}>{emptyText}</Text>
        )
      }
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => onPress(index)}>
            <View style={styles.orderItem}>
              <View style={styles.departmentBox}>
                <TickComponent
                  enabled={
                    checkedList?.length === 0 ? false : checkedList[index]
                  }
                />
                <View style={styles.suggestList}>
                  <Text style={styles.suggestItemNameText}>{item.name}</Text>
                </View>
              </View>
              {/* <Text
                style={[
                  styles.stockBox,
                  {
                    color:
                      stock === 'In stock'
                        ? Colors.primaryGreen
                        : Colors.secondaryRed,
                  },
                ]}>
                {stock}
              </Text> */}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  orderItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderItemsList: {
    backgroundColor: Colors.offWhite,
    borderRadius: 7,
    paddingVertical: 10,
    marginHorizontal: 32,
    marginVertical: 20,
    marginBottom: 60,
  },
  departmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  stockBox: {
    marginRight: 20,
    ...Typography.normal12,
  },
  suggestList: { width: '75%' },
  suggestItemNameText: { ...Typography.bold15, flexWrap: 'wrap' },
  emptyChecklist: {
    ...Typography.normal15,
    marginVertical: 20,
    alignSelf: 'center',
    color: Colors.primary4,
  },
});

export default ItemCheckList;
