# react-native-countdown
React Native CountDown


## Props
| Name | Description | Type | Default Value |
| :--- | :----- | :--- | :---: |
| containerStyle | Override the component style | object | {} |
| digitBgColor |  Digit background color | string | ![#FAB913](https://placehold.it/15/FAB913/000000?text=+) `'#FAB913'` |
| digitTxtColor | Digit text color | string | ![#000](https://placehold.it/15/000/000000?text=+) `'#000'` |
| timeTxtColor | Time labels text color | string | ![#000](https://placehold.it/15/000/000000?text=+) `'#000'` |
| size | Size of the countdown component | number | 15 |
| until | Number of seconds to countdown | number | 0 |
| onFinish | What function should be invoked when the time is 0 | func | null |
| onTimerClick | What function should be invoked when clicking on the timer | func | null |


## Preview

![React Native Countdown](/GIF/countdown-basic.gif?raw=true "React Native Countdown")

## Code
```javascript
import CountDown from 'react-native-countdown';

render() {
    return (
      <CountDown
        until={10}
        onFinish={() => alert('finished')}
        onTimerClick={() => alert('hello')}
        size={20}
      />
    )
}
```
