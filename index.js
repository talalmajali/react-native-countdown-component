import React, {PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

const DEFAULT_BG_COLOR = '#FAB913';
const DEFAULT_TIME_TXT_COLOR = '#FFF';
const DEFAULT_DIGIT_TXT_COLOR = '#FFF';

const CountDown = React.createClass({
  propTypes: {
    containerStyle: PropTypes.object,
    digitBgColor: PropTypes.string,
    digitTxtColor: PropTypes.string,
    timeTxtColor: PropTypes.string,
    size: PropTypes.number,
    until: PropTypes.number,
    onFinish: PropTypes.func,
    onTimerClick: PropTypes.func,
  },

  getInitialState() {
    return {
      until: this.props.until,
    };
  },

  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 1000);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  getTimeLeft() {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  },

  updateTimer() {
    const {until} = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      if (this.onFinish) {
        this.onFinish();
      }
    }

    this.setState({until: until - 1});
  },

  renderDigit(d) {
    const {digitBgColor, digitTxtColor, size} = this.props;
    return (
      <View style={[
        styles.digitCont,
        {backgroundColor: digitBgColor},
        {width: size * 2.3, height: size * 2.6},
      ]}>
        <Text style={[
          styles.digitTxt,
          {fontSize: size},
          {color: digitTxtColor}
        ]}>
          {d}
        </Text>
      </View>
    );
  },

  renderDoubleDigits(label, digits) {
    const {timeTxtColor, size} = this.props;

    return (
      <View key={label} style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>
          {this.renderDigit(digits)}
        </View>
        <Text style={[
          styles.timeTxt,
          {fontSize: size / 1.8},
          {color: timeTxtColor},
        ]}>
          {label}
        </Text>
      </View>
    );
  },

  renderCountDown() {
    const {until} = this.state;
    const {days, hours, minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
    const Component = this.props.onTimerClick ? TouchableOpacity : View;

    return (
      <Component
        style={styles.timeCont}
        onPress={this.props.onTimerClick}
      >
        {this.renderDoubleDigits('Days', newTime[0])}
        {this.renderDoubleDigits('Hours', newTime[1])}
        {this.renderDoubleDigits('Minutes', newTime[2])}
        {this.renderDoubleDigits('Seconds', newTime[3])}
      </Component>
    );
  },

  render() {
    const {containerStyle} = this.props;

    return (
      <View style={containerStyle}>
        {this.renderCountDown()}
      </View>
    );
  }
});

CountDown.defaultProps = {
  containerStyle: {},
  digitBgColor: DEFAULT_BG_COLOR,
  digitTxtColor: DEFAULT_DIGIT_TXT_COLOR,
  timeTxtColor: DEFAULT_TIME_TXT_COLOR,
  until: 0,
  size: 15,
};

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {
    color: 'white',
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {

    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

module.exports = CountDown;
