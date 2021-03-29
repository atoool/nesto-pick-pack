import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ItemCheckList from '../../components/ItemCheckList';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';

const SearchProductScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const {
    locale: { locale },
  } = useContext(AppContext);

  const { allItems, getAllItemList, AddToSimilarList } = useContext(
    PickerContext,
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const onMount = async () => await getAllItemList(18, 'update');
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (text) => {
    setSearch(text);
    let listItems = [];
    if (text !== '') {
      let txt = text?.toLowerCase();
      listItems = allItems.filter((item) => {
        if (item?.name?.toLowerCase()?.indexOf(txt) > -1) {
          return item;
        }
      });
    }
    setList(listItems);
  };

  const onCheck = (i) => {
    const temp = checkList;
    temp[i] = !temp[i] ? allItems[i] : null;
    setCheckList([...temp]);
  };

  const onAddToCheckList = () => {
    AddToSimilarList(checkList);
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          placeholder={locale?.placeholder?.search}
          autoCompleteType="off"
          value={search}
          onChangeText={onSearch}
          rightIconName="SearchSVG"
          style={styles.searchField}
        />
        <ItemCheckList
          items={list}
          onPress={onCheck}
          checkedList={checkList}
          emptyText={locale?.SPS_emptyText}
          loading={loading}
        />
      </ScrollView>
      <Button
        title={locale?.SPS_button}
        style={styles.suggestButton}
        onPress={onAddToCheckList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  searchField: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 32,
    paddingHorizontal: 10,
  },
  suggestButton: {
    borderRadius: 0,
    bottom: 0,
    width: '100%',
  },
});

export default SearchProductScreen;
