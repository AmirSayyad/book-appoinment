import React, {Component} from 'react';
import {
  Text,
  Image,
  Alert,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import {ButtonN, Card, CardSection, ColSection} from './common';
const URL = 'https://stark-escarpment-52071.herokuapp.com';

class SellersList extends Component {
  sellersData = [];
  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
      disabled: true,
      selectedDate: null,
      value: 'Search seller',
      loading: true
    };
  }

  componentDidMount() {
    const uri = URL.concat('/sellers');
    fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.sellersData = responseJson;
        this.setState({sellers: responseJson, loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
        Alert.alert('No data or Error might occured', JSON.stringify(error));
      })
      .done();
  }

  bookAppoinment(item) {
    this.props.setView(true, item);
  }

  searchSeller(query) {
    const newData = this.sellersData.filter(item => {
      const name = `${item.name.toUpperCase()} ${item.email.toUpperCase()}`;
      const queryStr = query.toUpperCase();
      return name.indexOf(queryStr) > -1;
    });
    this.setState({
      sellers: newData,
    });
  }

  render() {
    return (
      <View>
        <View style={styles.searchPanel}>
          <TextInput
            style={styles.searchBar}
            onChangeText={text => this.searchSeller(text)}
            placeholder="Search Sellers.."
          />
        </View>
        {this.state.loading && <ActivityIndicator size="large" color="#003995" />}
        <FlatList
          data={this.state.sellers}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <Card key={item._id}>
              <View style={styles.col}>
                <Image
                  style={styles.userImage}
                  source={{
                    uri: `https://bootdey.com/img/Content/avatar/avatar7.png`,
                  }}
                />
                <Text style={styles.boldFont}> {item.name} </Text>
                <View>
                  <Text style={[styles.smallFont, styles.italicFont]}>
                    {item.role}
                  </Text>
                </View>
                <CardSection style={styles.cardSectionRow}>
                  <Text style={styles.HFont}>Email: {item.email}</Text>
                  <Text style={styles.HFont}>Phone: {item.phone}</Text>
                </CardSection>
              </View>
              <CardSection>
                <Text style={styles.divider} />
              </CardSection>
              <CardSection>
                <Text style={styles.smallFont}> Next available:</Text>
                <Text style={styles.HFont}>
                  {moment(item.date).format('DD-MMM-YYYY')}{' '}
                </Text>
              </CardSection>
              <CardSection>
                <ButtonN
                  onPress={() => {
                    this.bookAppoinment(item);
                  }}>
                  Book Appoinment
                </ButtonN>
              </CardSection>
            </Card>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: '#003995',
  },
  cardSectionRow:{
      justifyContent: 'space-around',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  smallFont: {
    fontSize: 16,
    textAlign: 'center',
    color: '#003995',
  },
  boldFont: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003995',
    width: '99%',
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
  HFont: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    borderStyle: 'solid',
    borderColor: '#EEE',
    borderWidth: 1,
    width: '100%',
  },
  searchPanel: {
    backgroundColor: '#0095ff',
    width: '100%',
  },
  searchBar: {
    height: 60,
    borderColor: '#A9C7EC',
    borderWidth: 1,
    borderRadius: 30,
    margin: 5,
    padding: 5,
    fontSize: 15,
    backgroundColor: '#FFF',
  },
});

export default SellersList;
