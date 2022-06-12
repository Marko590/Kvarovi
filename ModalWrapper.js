
import { Image, StyleSheet, Text, View, Button, Modal, TouchableWithoutFeedback, Linking } from 'react-native';

export default function ModalWrapper(props) {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${props.coordinates.latitude},${props.coordinates.longitude}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ width: '100%', alignSelf: 'center', height: '100%', justifyContent: 'flex-start', backgroundColor: 'green' }}
        visible={props.check}
        onRequestClose={() => {
          props.setCheck(prevCheck => !prevCheck)

        }}>


        <TouchableWithoutFeedback onPress={() => {
          props.setCheck(prevCheck => !prevCheck);
        }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }} >
            <TouchableWithoutFeedback onPress={() => { }}>
              <View>
                <Button onPress={() => { Linking.openURL(url); }} title="Close" />
                <Text>{props.coordinates.latitude} {props.coordinates.longitude}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'space-between',

  },
  gradient:{
    
    
    
    borderRadius: 7,
    marginRight:15,
    marginLeft:15,
    marginBottom: 0,
  },
  expandableCardLast: {
    backgroundColor: '#787777',
    borderRadius: 7,
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    flex: 0,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  expandableCard: {
    backgroundColor: '#787777',
    justifyContent: 'center',
    flex: 0,
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  neighbourhoodText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'sans-serif-light',
  },

  neighbourhoodTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3b3b3',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 0,
    marginRight:5,
    marginLeft:5
  },
  neighbourhoodTitlePressed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d6d6d6',
    justifyContent: 'space-between',
    borderRadius: 7,
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft:5,
    marginRight:5
  },
  arrowIcon: {
    marginTop: 4,
    flex: 0,
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
    
  },
  timeTitle: {
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: '#ffa270',
    padding: 0,
    borderRadius: 10,
    alignItems: "center",
  },
  timeTitleRipple: {
    borderRadius: 10,
    
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15
  }


});
