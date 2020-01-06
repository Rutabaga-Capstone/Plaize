import {StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
  plantText: {
    marginTop: 190,
    fontFamily: 'yorkten',
    fontSize: 18
  },
  fakeView: {
    height: 58,
    borderBottomColor: '#C7CAD4',
    borderBottomWidth: 0.5
  },
  heading: {
    textAlign: 'left',
    marginLeft: -60
  },
  alert: {
    backgroundColor: 'grey'
  },
  welcomeContainer: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plantsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: 80,
    flex: 1
  },
  welcomeImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 50,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'yorkten'
  },
  titleTwo: {
    marginTop: 30,
    color: '#000000',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'yorkten'
  },
  subtitle: {
    color: '#C7CAD4',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginRight: 0,
    marginLeft: 0,
    marginTop: 40,
    fontSize: 16,
    marginBottom: 35
  },
  screenText: {
    color: '#000000',
    fontFamily: 'yorkten',
    fontSize: 18,
    textAlign: 'center'
  },
  socialContainer: {},
  socialColumn: {
    width: '50%' // 50% of container width
  },
  socialLinks: {
    color: '#6CC7BD',
    fontSize: 18
  },
  label: {
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 30
  },
  button: {
    backgroundColor: '#6CC7BD'
  },
  container: {
    alignSelf: 'stretch'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    flex: 1,
    textAlign: 'center'
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})

export default styles
