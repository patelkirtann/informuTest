/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

var REQUEST_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=5b0ea911a68feb390b90a878c64da594&language=en-US&sort_by=popularity.desc';
var Accordion = require('react-native-accordion');

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.results),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(results) {
       var header = (
       <View style={styles.container}>
             <Image
                  source={{uri: 'https://image.tmdb.org/t/p/w500'+results.poster_path}}
                  style={styles.thumbnail}
             />
             <View style={styles.rightContainer}>
                  <Text style={styles.title}>{results.title}</Text>
                  <Text style={styles.year}>{results.release_date}</Text>
                  <Text style={styles.year}>{results.vote_average}</Text>
             </View>
       </View>
      );
      var content = (
        <View style={styles.rightContainer}>
              <Text style={styles.title}>{results.title}</Text>
              <Text style={styles.year}>{results.release_date}</Text>
              <Text style={styles.year}>{results.vote_average}</Text>
        </View>

      );
      return (
        <Accordion
          header={header}
          content={content}
          easing="easeOutCubic"
        />
      );
//    return (
//      <View style={styles.container}>
//        <Image
//          source={{uri: 'https://image.tmdb.org/t/p/w500'+results.poster_path}}
//          style={styles.thumbnail}
//        />
//        <View style={styles.rightContainer}>
//          <Text style={styles.title}>{results.title}</Text>
//          <Text style={styles.year}>{results.release_date}</Text>
//          <Text style={styles.year}>{results.vote_average}</Text>
//        </View>
//      </View>
//    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 8,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#e0e1e2',
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
  year: {
    marginLeft: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 56,
    height: 72,
  },
  listView: {
    paddingTop: 8,
    backgroundColor: '#F5FCFF',
  },
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
