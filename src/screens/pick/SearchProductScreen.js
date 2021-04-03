import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ItemCheckList from '../../components/ItemCheckList';
import { AppContext } from '../../context/AppContext';
import { PickerContext } from '../../context/PickerContext';
import { Colors } from '../../styles';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setList(allItems);
  }, [allItems]);

  const onChangeText = (text) => {
    setSearch(text);
    text === '' && setList([]);
  };

  const onSearch = async () => {
    setLoading(true);
    if (search !== '') {
      await getAllItemList(search)
        .then(() => {})
        .catch(() => {});
    }
    setLoading(false);
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

  const nonNullArray = checkList.filter((l) => l != null);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          placeholder={locale?.placeholder?.search}
          autoCompleteType="off"
          value={search}
          onChangeText={onChangeText}
          rightIconName="SearchSVG"
          style={styles.searchField}
          onSearch={onSearch}
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
        disabled={nonNullArray.length === 0}
        title={locale?.SPS_button}
        style={styles.suggestButton}
        onPress={onAddToCheckList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.WHITE, flex: 1 },
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
