import React, {PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

const DEFAULT_BG = '#FAB913';
const LABEL_COLOR = '#FFF';
const DIGIT_TXT_COLOR = '#FFF';

const CountDown = React.createClass({
  propTypes: {
    timerStyle: PropTypes.object,
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
    const {timerStyle, size} = this.props;
    return (
      <View style={[
        styles.digitCont,
        {backgroundColor: timerStyle.backgroundColor || DEFAULT_BG},
        {width: size * 2.3, height: size * 2.6},
      ]}>
        <Text style={[
          styles.digitTxt,
          {fontSize: size},
          {color: timerStyle.digitTxtColor || DIGIT_TXT_COLOR}
        ]}>
          {d}
        </Text>
      </View>
    );
  },

  renderDoubleDigits(label, digits) {
    const {timerStyle, size} = this.props;

    return (
      <View key={label} style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>
          {this.renderDigit(digits)}
        </View>
        <Text style={[
          styles.timeTxt,
          {fontSize: size / 1.8},
          {color: timerStyle.labelColor || LABEL_COLOR},
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
    const {timerStyle} = this.props;
    return (
      <View style={timerStyle.container || {}}>
        {this.renderCountDown()}
      </View>
    );
  }
});

CountDown.defaultProps = {
  timerStyle: {},
  size: 15,
  until: 0,
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
