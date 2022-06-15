import React, { useState, useEffect } from "react";
import { TouchableOpacity,Text,StyleSheet,View,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
export default function SideBar (props)  {
  const [chosen, setChosen] = useState("");

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      setChosen(value);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    readData();
  }, [])
  return (
    <View>
      <LinearGradient colors={['#ffffff', '#dcdcdc']} style={{ borderRadius: 10 }}
        start={{ x: 0, y: 0 }} locations={[0.82, 1]}>

        <View style={{ paddingTop: 150 }}>

          <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Vodovod</Text>
          </View>

          <SideBarEntry pressEvent={() => { props.setIndex(0) }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Kvarovi</Text>
            <ChevronRight />
          </SideBarEntry>

          <SideBarEntry pressEvent={() => { props.setIndex(1) }}>
            <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Radovi</Text>
            <ChevronRight />
          </SideBarEntry>
        </View>
      </LinearGradient>

      <LinearGradient colors={['#ffffff', '#dcdcdc']} style={{ borderRadius: 10 }}
        start={{ x: 0, y: 0 }} locations={[0.82, 1]}>

        <SideBarHeader>
          <Text style={{ fontSize: 40, fontFamily: 'sans-serif-light' }}>Struja</Text>
        </SideBarHeader>


        <SideBarEntry pressEvent={() => { }}>
          <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Kvarovi</Text>
          <ChevronRight />
        </SideBarEntry>

        <SideBarEntry pressEvent={() => { }}>
          <Text style={{ fontSize: 20, fontFamily: 'monospace' }}>Radovi</Text>
          <ChevronRight />
        </SideBarEntry>


        <Picker
          selectedValue={chosen}
          onValueChange={(itemValue, itemIndex) => {
            setChosen(itemValue);
            storeData(itemValue)}}>
          <Picker.Item label="Стари Град" value="Стари Град" />
          <Picker.Item label="Савски Венац" value="Савски Венац" />
          <Picker.Item label="Палилула" value="Палилула" />
          <Picker.Item label="Звездара" value="Звездара" />
          <Picker.Item label="Вождовац" value="Вождовац" />
          <Picker.Item label="Чукарица" value="Чукарица" />
          <Picker.Item label="Раковица" value="Раковица" />
          <Picker.Item label="Нови Београд" value="Нови Београд" />
          <Picker.Item label="Земун" value="Земун" />
          <Picker.Item label="Гроцка" value="Гроцка" />
          <Picker.Item label="Барајево" value="Барајево" />
          <Picker.Item label="Сурчин" value="Сурчин" />

        </Picker>
      </LinearGradient>
    </View>
  )
}

function SideBarEntry(props) {

  return (
    <TouchableOpacity onPress={() => { props.pressEvent() }}>
      <View style={styles.sideBarEntry}>
        {props.children}
      </View>
    </TouchableOpacity>
  )
}

function SideBarHeader(props) {

  return (
    <View style={{ paddingTop: 50 }}>
      <View style={{ alignItems: 'center', paddingLeft: 20, height: 60, flexDirection: 'row', justifyContent: 'space-between' }}>
        {props.children}
      </View>
    </View>
  )
}


function ChevronRight(props) {

  return (
    <LinearGradient colors={['#A47AFD', '#FEA280']} style={{ marginRight: 20, borderRadius: 20 }}
      start={{ x: 0, y: 0 }} locations={[0, 0.75]}>
      <Image
        style={{ width: 25, height: 25 }}
        source={require('./assets/chevron-right.png')} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '10%',
  },
  gradient: {
    height: 1080,
    marginBottom: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    height: 40,
    marginTop: 35,
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,

  },
  expandableCardLast: {
    backgroundColor: '#787777',
    borderRadius: 7,
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  expandableCard: {
    backgroundColor: '#787777',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  arrowIcon: {
    marginTop: 4,
    flex: 0,
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
  },
  cardHolder: {
    backgroundColor: '#f0e9e9',
    height: 350,
    marginTop:20,
    borderRadius: 20,
    width: 320,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 5,
    marginBottom: 20
  },
  topTabIcons: {
    width: 30,
    height: 30
  },
  sideBarEntry: {
    alignItems: 'center',
    paddingLeft: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 15
  },
  categoryContainer: {

    alignItems: 'center',
    paddingLeft: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  Card: {
    height: 251,
    margin: 5,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 50,
    shadowOpacity: '20%',
    justifyContent: 'space-around',
    padding: 15,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 0.16,
  }
});
