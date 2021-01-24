import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'

export default class App extends Component {

  constructor(props) {
    super(props);
    // set state data
    this.state = {
      data: []
    }
  }

  // untuk mendapatkan data dari fetch
  getDataPokemon() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(result => {
        // console.warn(result.data.results); //menampilkan data di warning
        this.setState({
          data: result.data.results
        })
      });
  }

  // lifecycle component didmount
  componentDidMount() {
    this.getDataPokemon();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Pokedex
        </Text>
        {/* menambilkan data list dengan menggunakan Flatlist */}
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.itemText} key={index}>
                {index + 1 + ". " + item.name}
              </Text>
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: 25,
    marginBottom: 20
  },
  item: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 10
  },
  itemText: {
    color: "white",
    fontSize: 16
  }
})