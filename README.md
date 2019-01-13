# react-native-countdown
React Native CountDown

## Installation
Run `npm install react-native-countdown-component --save` OR `yarn add react-native-countdown-component --save`

## Props
| Name | Description | Type | Default Value |
| :--- | :----- | :--- | :---: |
| style | Override the component style | object | {} |
| digitBgColor |  Digit background color | string | ![#FAB913](https://placehold.it/15/FAB913/000000?text=+) `'#FAB913'` |
| digitTxtColor | Digit text color | string | ![#000000](https://placehold.it/15/000/000000?text=+) `'#000000'` |
| digitTxtStyle | Override default Digit style | object | {}|
| timeTxtColor | Time labels text color | string | ![#000000](https://placehold.it/15/000/000000?text=+) `'#000000'` |
| timeLabelStyle | Override default time labels style | object | {} |
| size | Size of the countdown component | number | 15 |
| until | Number of seconds to countdown | number | 0 |
| onFinish | What function should be invoked when the time is 0 | func | null |
| onPress | What function should be invoked when clicking on the timer | func | null |
| timeToShow | What Digits to show | array | ['D', 'H', 'M', 'S'] |
| labelD/H/M/S | Text to show in label | string | 'Days' / 'Hours' / 'Minutes' / 'Seconds' |


## Preview

![React Native Countdown](https://media.giphy.com/media/xT0xeLWYNSaLerFGko/giphy.gif "React Native Countdown")

## Code
```javascript
import CountDown from 'react-native-countdown-component';

render() {
    return (
      <CountDown
        until={10}
        onFinish={() => alert('finished')}
        onPress={() => alert('hello')}
        size={20}
      />
    )
}
```

## Preview

![React Native Countdown](https://media.giphy.com/media/wIwc1dinsZhx6v2PxB/giphy.gif "React Native Countdown")

## Code
```javascript
import CountDown from 'react-native-countdown-component';

render() {
    return (
      <CountDown
        until={60 * 10 + 30}
        size={30}
        onFinish={() => alert('Finished')}
        digitBgColor={'#fff'}
        digitTxtColor={'#1CC625'}
        timeToShow={['M', 'S']}
        labelM={'MM'}
        labelS={'SS'}
      />
    )
}
```
