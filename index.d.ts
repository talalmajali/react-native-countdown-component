import {StyleProp, ViewStyle} from 'react-native';
import * as React from 'react';

declare module 'react-native-advanced-countdown-component' {

  export interface TimeLabels {
    d: string;
    h: string;
    m: string;
    s: string;
  }

  interface Time {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  }

  export interface CountdownPropTypes {
    id?: string,
    digitStyle?: StyleProp<ViewStyle>,
    digitTxtStyle?: StyleProp<ViewStyle>,
    timeLabelStyle?: StyleProp<ViewStyle>,
    separatorStyle?: StyleProp<ViewStyle>,
    timeToShow?: string[],
    showSeparator?: boolean,
    size?: number,
    until: number,
    onChange?: () => void,
    onPress?: () => void,
    onFinish?: () => void,
    timeLabels?: TimeLabels,
    upperLabels?: boolean
  }

  export class CountdownComponent extends React.Component<CountdownPropTypes> {
    private _handleAppStateChange(): void;
    getTimeLeft(): Time;
    updateTimer(): void;
    renderDigit(d: number): JSX.Element;
    renderLabel(label: string): JSX.Element;
    renderDoubleDigits(label: string, digits: number, upperLabels: boolean): JSX.Element;
    renderSeparator(): JSX.Element;
    renderCountdown(): JSX.Element;
  }

}