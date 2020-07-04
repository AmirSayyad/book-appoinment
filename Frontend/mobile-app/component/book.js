import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {ButtonN, CardSection, Input} from './common';
import moment from 'moment';
const URL = 'https://stark-escarpment-52071.herokuapp.com';

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      seller: this.props.seller[0],
      slotsTime: [],
      disabled: true,
      selectedDate: null,
      selectedTime: null,
    };
  }

  componentDidMount() {
    const uri = URL.concat('/slots/').concat(this.state.seller._id);
    console.log(uri);
    fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          let dates = this.formattedDates(responseJson.slots);
          this.setState({data: dates});
        } else {
          Alert.alert('No available time slots found for this seller');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Oops something went wrong!');
      })
      .done();
  }

  formattedDates(rdata) {
    let slotsArray = [];
    rdata.forEach(element => {
      let sdate = moment(element.start);
      let edate = moment(element.end);
      const sDateL = sdate.format('L');
      let sDateLT = sdate.format('LT');
      const eDateL = edate.format('L');
      let eDateLT = edate.format('LT');
      let i = slotsArray.findIndex(item => item.availableDate === sDateL);
      if (i === -1) {
        if (moment(sdate).isAfter(moment(), 'time')) {
          let a = {availableDate: '', slots: []};
          a.availableDate = sDateL;
          let time = `${sDateLT} ${eDateLT}`;
          a.slots.push(time);
          slotsArray.push(a);
        }
      } else {
        if (moment(sdate).isAfter(moment(), 'time')) {
          let time = `${sDateLT} ${eDateLT}`;
          slotsArray[i].slots.push(time);
        }
      }
    });
    return slotsArray;
  }

  getFormattedDate(item) {
    return moment(item, 'MM/DD/YYYY').format('ddd, MMM D');
  }

  showSlotDate(item) {
    console.log(item);
    this.setState({
      slotsTime: item.slots,
      bookingDate: item.availableDate,
      disabled: true,
    });
  }

  showSlotTime(item) {
    this.setState({
      disabled: false,
      bookingTime: item,
    });
  }

  bookAppoinment() {
    if (!this.state.name && !this.state.email && !this.state.phone) {
      Alert.alert('Error', 'Please enter your name, email and phone!');
      return false;
    }
    const uri = URL.concat('/booking');
    let body = {
      buyer_name: this.state.name,
      buyer_email: this.state.email,
      buyer_phone: this.state.phone,
      seller_id: this.state.seller._id,
      seller_name: this.state.seller.name,
      date: new Date(this.state.bookingDate),
      time_slot: this.state.bookingTime,
    };
    console.log(body);
    fetch(uri, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(
          'Sucess',
          'Appoinment booked successfully you will get notification!',
        );
        this.setState({
          disabled: true,
        });
      })
      .catch(error => {
        Alert.alert('Error', 'Oops something went erong!');
      })
      .done();
  }

  goBack() {
    this.props.setView(false);
  }

  render() {
    return (
      <ScrollView>
        <CardSection>
          <View style={styles.topHeader}>
            <Text
              style={styles.goBack}
              onPress={() => {
                this.goBack();
              }}>
              Go Back
            </Text>
          </View>
        </CardSection>
        <CardSection>
          <Image
            style={styles.userImage}
            source={{uri: `https://bootdey.com/img/Content/avatar/avatar7.png`}}
          />
          <Text style={styles.boldFont}> {this.state.seller.name} </Text>
        </CardSection>
        <CardSection>
          <Text style={styles.divider} />
        </CardSection>

        <Text style={styles.boldFont}>Enter your details</Text>
        <CardSection>
          <Input
            placeholder="Enter your name"
            placeholder="name"
            label="Name"
            value={this.state.name}
            onChangeText={name => this.setState({name})}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Enter your email"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Enter your phone number"
            label="Phone"
            value={this.state.phone}
            onChangeText={phone => this.setState({phone})}
          />
        </CardSection>

        <Text style={styles.boldFont}>Select date and time of your visit</Text>
        <CardSection>
          <Text style={styles.divider} />
        </CardSection>

        <ScrollView horizontal={true} style={styles.container}>
          {this.state.data.map((item, index) => (
            <View key={index}>
              <Text
                style={
                  this.state.selectedDate !== index
                    ? styles.itemList
                    : styles.selectedItemList
                }
                onPress={() => {
                  this.showSlotDate(item);
                  this.setState({selectedDate: index, selectedTime: null});
                }}>
                {this.getFormattedDate(item.availableDate)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <CardSection>
          <Text style={styles.divider} />
        </CardSection>

        <ScrollView contentContainerStyle={styles.slotTimeContainer}>
          {this.state.slotsTime.map((item, index) => (
            <Text
              key={index}
              style={
                this.state.selectedTime !== index
                  ? styles.slotTimeItem
                  : styles.slotSelectedTimeItem
              }
              onPress={() => {
                this.showSlotTime(item);
                this.setState({selectedTime: index});
              }}>
              {item}
            </Text>
          ))}
        </ScrollView>

        <Button
          title="Book Appoinment"
          onPress={() => this.bookAppoinment(false)}
          disabled={this.state.disabled}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAEFF5',
    color: '#003995',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  topHeader: {
    backgroundColor: '#FFF',
    height: 60,
    borderColor: '#A9C7EC',
    borderBottomWidth: 1,
    width: '100%',
    textAlignVertical: 'center',
  },
  goBack: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 14,
  },
  itemList: {
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DCDCDC',
    margin: 10,
    padding: 10,
    fontSize: 16,
    color: '#003995',
    backgroundColor: '#FFF',
  },
  selectedItemList: {
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DCDCDC',
    margin: 10,
    padding: 10,
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#003995',
  },
  slotTimeContainer: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap',
  },
  slotTimeItem: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DCDCDC',
    backgroundColor: '#FFF',
    color: '#5CBAD2',
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
  slotSelectedTimeItem: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DCDCDC',
    backgroundColor: '#5CBAD2',
    color: '#FFF',
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
  boldFont: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#003995',
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 60,
    alignSelf: 'center',
    borderColor: '#DCDCDC',
    borderWidth: 3,
  },
  italicFont: {
    fontStyle: 'italic',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    borderStyle: 'solid',
    borderColor: '#EEE',
    borderWidth: 1,
    width: '100%',
  },
});
