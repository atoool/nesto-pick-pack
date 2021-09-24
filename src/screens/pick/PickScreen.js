import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheetTitle from '../../components/BottomSheetTitle';
import Divider from '../../components/Divider';
import Loader from '../../components/Loader';
import ModalComponent from '../../components/ModalComponent';
import NoContent from '../../components/NoContent';
import PickList from '../../components/PickList';
import Pill from '../../components/Pill';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';
import { Colors, Typography } from '../../styles';
import formatAmPm from '../../utils/formatAmPm';

const now = Date.now();

const SNAP_POINTS = ['30%', '50%', '80%', '100%'];

const PickScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [sortTimeSlot, setSortTimeSlot] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const {
    locale: { locale },
  } = useContext(AppContext);
  const { orders, getOrdersList, setItemPicked, getDropList } = useContext(
    PickerContext,
  );

  const _getOrdersList = async () => {
    setRefreshing(true);
    try {
      await getOrdersList();
    } catch (e) {
      console.log(e);
    }
    setRefreshing(false);
  };

  const onMount = async () => {
    if (route?.params?.logout ?? false) {
      return;
    }
    setLoading(true);
    await getOrdersList();
    setLoading(false);
  };

  useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onManualEntry = async (item, itemsQty) => {
    setLoading(true);
    try {
      await setItemPicked(
        item?.id,
        item?.item_type,
        itemsQty,
        item?.qty ?? item?.repick_qty ?? 0,
        0,
      ).then(async () => {
        await getOrdersList();
        navigation.navigate('ItemSuccessScreen');
        await getDropList();
        setLoading(false);
      });
    } catch {
      setLoading(false);
    }
  };

  //Bottom Sheet
  const snapPoints = useMemo(() => SNAP_POINTS, []);
  const bottomSheetRef = useRef();

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const toggleSelectedTimeSlot = (timeSlotString) => {
    if (selectedTimeSlots.includes(timeSlotString)) {
      const removed = selectedTimeSlots.filter((t) => t !== timeSlotString);
      setSelectedTimeSlots(removed);
    } else {
      const added = [...selectedTimeSlots, timeSlotString];
      setSelectedTimeSlots(added);
    }
  };

  const renderTimeSlotItem = useCallback(
    (item) => {
      const sTime = formatAmPm(item.timeslot.start_time);
      const eTime = formatAmPm(item.timeslot.end_time);
      const formattedTime = `${sTime} - ${eTime}`;
      const selected = selectedTimeSlots.includes(formattedTime);
      return (
        <Pill
          onPress={() => toggleSelectedTimeSlot(formattedTime)}
          selected={selected}
          title={formattedTime}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTimeSlots],
  );

  const toggleSelectedDepartments = (dept) => {
    if (selectedDepartments.includes(dept)) {
      const removed = selectedDepartments.filter((t) => t !== dept);
      setSelectedDepartments(removed);
    } else {
      const added = [...selectedDepartments, dept];
      setSelectedDepartments(added);
    }
  };

  const renderDepartmentItem = useCallback(
    (dept) => {
      const selected = selectedDepartments.includes(dept);
      return (
        <Pill
          onPress={() => toggleSelectedDepartments(dept)}
          selected={selected}
          title={dept}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedDepartments],
  );

  //filter sort
  let localOrders = [...orders];

  const uniqueDepartmentsStub = [];
  for (const order of orders) {
    for (const item of order.items) {
      uniqueDepartmentsStub.push(item.department);
    }
  }

  const uniqueDepartments = [...new Set(uniqueDepartmentsStub)];

  //Sort Time Slot
  if (sortTimeSlot) {
    localOrders = [...orders].reverse();
  }

  //Filter Time Slot
  if (selectedTimeSlots.length > 0) {
    localOrders = localOrders.filter((item) => {
      const sTime = formatAmPm(item.timeslot.start_time);
      const eTime = formatAmPm(item.timeslot.end_time);
      const formattedTime = `${sTime} - ${eTime}`;
      return selectedTimeSlots.includes(formattedTime);
    });
  }

  //Filter department
  if (selectedDepartments.length > 0) {
    localOrders = localOrders.map((lo) => {
      let myItems = [];
      let draftOrder = JSON.parse(JSON.stringify(lo));
      for (const article of lo.items) {
        selectedDepartments.includes(article.department) &&
          myItems.push(article);
      }
      draftOrder.items = myItems;
      return draftOrder;
    });
  }

  const clearCloseBottomSheet = () => {
    setSelectedTimeSlots([]);
    setSelectedDepartments([]);
    bottomSheetRef.current.close();
  };

  const filtersOn =
    selectedTimeSlots.length > 0 || selectedDepartments.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text style={Typography.bold30}>{locale?.headings.pick}</Text>
        <View style={styles.shoulderButtonsContainer}>
          <TouchableOpacity
            onPress={() => handleSnapPress(1)}
            style={styles.shoulderButtons}>
            <Icon
              name="filter"
              color={filtersOn ? Colors.secondaryRed : Colors.BLACK}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSortTimeSlot(!sortTimeSlot)}
            style={styles.shoulderButtons}>
            <Icon2
              name={sortTimeSlot ? 'sort-descending' : 'sort-ascending'}
              color={Colors.BLACK}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={localOrders}
          ListEmptyComponent={() => <NoContent name="NoOrdersSVG" />}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          ItemSeparatorComponent={() => <Divider />}
          onRefresh={() => _getOrdersList()}
          refreshing={refreshing}
          renderItem={({ item, index }) => (
            <PickList
              items={item?.items ? item?.items : []}
              index={index}
              orderType={
                item?.order_type ? item?.order_type : locale?.status?.SD
              }
              itemCount={''}
              startTime={
                item?.timeslot?.start_time ? item?.timeslot?.start_time : now
              }
              endTime={
                item?.timeslot?.end_time ? item?.timeslot?.end_time : now
              }
              timeLeft={
                item?.pickingDeadlineTimestamp
                  ? item?.pickingDeadlineTimestamp
                  : now
              }
              locale={locale}
              onManualEntry={onManualEntry}
              slotType={
                (item?.order_type ?? 'scheduled') === 'scheduled'
                  ? 'Scheduled'
                  : 'Express'
              }
            />
          )}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <Loader fullScreen />
          </View>
        )}
      </View>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <View style={styles.bottomSheetHeader}>
          <TouchableOpacity
            onPress={clearCloseBottomSheet}
            style={styles.bottomSheetHeaderButtons}>
            <Icon name="x" color={Colors.BLACK} size={20} />
          </TouchableOpacity>
          <Text style={Typography.bottomSheetHeader}>Filter By</Text>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current.close()}
            style={styles.bottomSheetHeaderButtons}>
            <Icon name="check" color={Colors.BLACK} size={20} />
          </TouchableOpacity>
        </View>
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetScrollView}>
          <BottomSheetTitle title={'Time Slot'} />
          {orders.map((orderItem) => renderTimeSlotItem(orderItem))}
          <BottomSheetTitle title={'Department'} />
          {uniqueDepartments.map((dept) => renderDepartmentItem(dept))}
        </BottomSheetScrollView>
      </BottomSheet>
      <ModalComponent
        visible={route?.params?.logout ?? false}
        text="Logging out. Please wait."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
  contentContainer: { paddingBottom: 60 },
  headerContainer: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.offWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    height: '100%',
    width: '100%',
  },
  shoulderButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shoulderButtons: { paddingVertical: 10, paddingHorizontal: 5 },
  bottomSheetHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  bottomSheetHeaderButtons: { padding: 10 },
  bottomSheetScrollView: {
    padding: 10,
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
  },
});

export default PickScreen;
