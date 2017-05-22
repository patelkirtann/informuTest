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
                  <Text style={styles.subText}>{'Ratings: '+results.vote_average}
                        {'\t\t\tPopularity: '+results.popularity}</Text>
                  <Text style={styles.subText}>{'Release Date: '+results.release_date}</Text>
             </View>
       </View>);

       var content = (
             <View style={styles.bottomContainer}>
                  <Text style={styles.contentHead}>{'Overview: '}</Text>
                  <Text style={styles.content}>{'\t\t\t'+results.overview}</Text>

                  <Text style={styles.contentHead}>{'ID: '}</Text>
                  <Text style={styles.content}>{'\t\t\t'+results.id}</Text>

                  <Text style={styles.contentHead}>{'Vote Count: '}</Text>
                  <Text style={styles.content}>{'\t\t\t'+results.vote_count}</Text>
                </View>);

       return (
              <Accordion
                  header={header}
                  content={content}
                  easing="easeOutCubic"
              />
       );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: 2,
    borderWidth: 0.5,
    borderColor: '#808080',
  },
  rightContainer: {
    flex: 1,
  },
  bottomContainer: {
      flex: 1,
      backgroundColor: '#696969',
      paddingBottom: 8,
    },
  title: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subText: {
    fontSize: 12,
    color: '#3b3e42',
    marginLeft: 8,
    textAlign: 'left',
  },
  contentHead: {
        fontSize: 12,
        color: '#ffffff',
        marginLeft: 8,
        textAlign: 'left',
        fontWeight: 'bold',
      },
  content: {
      fontSize: 12,
      color: '#d3d3d3',
      marginLeft: 8,
      textAlign: 'left',
    },
  thumbnail: {
    width: 56,
    height: 80,
  },
  listView: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#d3d3d3',
  },
});
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
