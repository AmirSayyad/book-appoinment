import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './component/common/header';
import SellersList from './component/sellersList';
import Book from './component/book';


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = { book: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(book, item) {
    this.setState({
      book: book,
      seller: [item]
    });
  }

  renderContent() {
    if (this.state.book === false) {
      return <SellersList setView={this.handleClick} />; 
    }
    if (this.state.book) {
      return <Book setView={this.handleClick} seller={this.state.seller}/>; 
    }
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

