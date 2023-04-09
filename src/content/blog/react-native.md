---
author: Kevin
pubDatetime: 2023-01-31T11:56:00Z
title: React Native
postSlug: react-native
featured: true
draft: false
tags:
  - react-native
ogImage: ""
description: Udemy course by Maximilian Schwarzmüller
---

## Basic Concept of React Native

### What is React Native

React Native is like ReactDOM. It is a library that allows you to render React components to native mobile UI elements in iOS or Android device.

### What React Native does

👉 Rect Components will be compiled

We will write React components and React Native will compile and bundle them to Real Native App code to respective platform equivalents.

| Web Browser | Android   | iOs         | React Native JSX |
| ----------- | --------- | ----------- | ---------------- |
| `<div>`     | ViewGroup | UIView      | `<View>`         |
| `<input>`   | EditText  | UITextField | `<TextInput>`    |
| `<p>`       | TextView  | UITextView  | `<Text>`         |

👉 Logic will not be compiled

React Native will spin up a JavaScript process as part of the native app and it allows this process to talk to the underlying Android or iOS platform.

### Expo CLI & React Native CLI

Expo

- Third-party library
- Provides a lot of features out of the box
- Easy to get started with
- Provides `managed workflow` and `bare workflow`
- Can eject to bare workflow at any time

REACT NATIVE CLI

- By React-Native team
- Bare-bone setup
- Easier integration with native code

### Getting Started

👉 Running React Native app on your phone

1. Install Expo CLI

   ```bash
   npm install -g expo-cli
   expo init my-project
   ```

2. Download `Expo Go` app on your phone
3. Run `npm start` to start the development server
4. Scan the QR code with `Expo Go` app
5. Make changes to the code and save and the app will automatically reload

👉 Running React Native app on your simulator

1. Download Android Studio for Android or Xcode for iOS

   - Open Android Studio and open Virtual Device Manager, create a new device that is available for Play Store with the latest version of Android. Then, launch the emulator.
   - Open Simulator from Xcode and create a new simulator of latest iPhone

2. Go to the terminal, Press `i` for iOS simulator or `a` for Android simulator
3. We can run both iOS and Android simulator at the same time
4. Make changes to the code and save and the app will automatically reload

## React Native Basics

Expo will take `App.js` as the entry point of the app.

### Core UI Components

`<View>` is to hold and layout other components.

- You cannot put text strings directly into the `<View>`.
- By default, every `<View>` uses `flexbox` and is set `flexDirection: "column"`.

`<ScrollView>` is to scroll the content.

- `<ScrollView>` is for making a scrollable container but not able to set the height of the container. so if you want to set the height of the container, you need to wrap the `<ScrollView>` inside a `<View>` and set the height of the `<View>`.
- `<ScrollView>` will render all the list items at once, so it is not recommended to use `<ScrollView>` for a long list of items, which will cause performance issues.

`<FlatList>` will only render the visible items, and all the items that are outside of the screen will be loaded on demand (or rendered lazily).

- `<FlatList>` requires a `data` prop to render the list of items.
- `<FlatList>` requires a `renderItem` prop as function to tell `<FlatList>` how to render each item.
- two ways to provide a key to each item:
  - `key` field in the data item object
  - we can take from any field, for example: id. then add `keyExtractor` prop as function to return the key for each item.

```js
<FlatList
  data={courseGoals}
  renderItem={itemData => {
    return (
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{itemData.item.text}</Text>
      </View>
    );
  }}
  keyExtractor={(item, index) => {
    return item.id;
  }}
/>
```

`<Text>` is for displaying text.

- Text supports nesting styling, and touch handling.
- Can't have a text node as child of a `<View>`.

The `<Text>` element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a `<Text>` are no longer rectangles, but wrap when they see the end of the line.

```jsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: the text will be inline if the space allowed it
// |First part and second part|

// otherwise, the text will flow as if it was one
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part and|
// |second part   |

// otherwise, the text will flow in its own block
// |First part |
// |and        |
// |second part|
```

`<Image>`

- requires `source` prop to display an image. And we can use `require()` to load the image from the local file system by relative path.

```js
<Image source={require("../assets/images/goal.png")} />
```

`<LinearGradient>`

- If we want transitions of multiple colors in a linear direction, we can install `expo install expo-linear-gradient` and provide an array of colors as prop it.

```js
import { LinearGradient } from "expo-linear-gradient";

<LinearGradient
  colors={["#4c669f", "#3b5998", "#192f6a"]}
  style={styles.button}
>
  <Text>Sign in with Facebook</Text>
</LinearGradient>;
```

`<ImageBackground>`

- source: the image to display
- resizeMode: how to resize the image when the frame doesn't match the raw image dimensions
- style: styles to apply to the `<View>` wrapping the `<Image>`
- imageStyle: styles to apply to the `<Image>`

```js
import { ImageBackground } from "react-native";

<ImageBackground
  source={require("../assets/images/background.jpg")}
  resizeMode="cover"
  style={styles.image}
  imageStyle={{ opacity: 0.5 }}
/>;
```

`<SafeAreaView>`

- This is to render content within the safe area boundaries of a device (under the notch on iPhone X and above).

```js
import { Text, SafeAreaView } from "react-native";

const App = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Page content</Text>
  </SafeAreaView>
);
```

### Styling & Layout

We can style the components in 2 ways:

- Inline style
- StyleSheet object: by using `StyleSheet.create()`, we get the benefit of auto-completion, validation and performance improvement.

We can also pass an array of styles - the last style in the array has precedence, so you can use this to inherit styles. This is useful to create a flexible custom components.

```js
import { StyleSheet, Text, View, Button } from "react-native";

export const Card = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
  },
});
```

- Layouts are typically created using the `flexbox` system.
- Unlike web css, the styles don't cascade/inherit. So if you want to apply the same style to multiple components, you need to create a style object and pass it to each component.
- We can add styles inside `app.json` to apply the same style to all the components.

```json
{
  "expo": {
    // ...
    "backgroundColor": "#1e085a"
  }
}
```

- If we want to add shadow,
  - for android, we can use `elevation` prop, the higher the number, the higher the shadow
  - for iOS, we can use `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` props

```js
const styles = StyleSheet.create({
  inputContainer: {
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
```

### Interactivity & State

`<TextInput>` is for user input

- onChangeText: listen to the change
- value: use `value` prop to set the value
- maxLength: set a number for max length
- keyboardType: `<TextInput />` allows you to control which keyboard is opened by the device. For example, you can use `keyboardType="number-pad"` to open a numeric keyboard.
- autoCapitalize: we can disables auto-capitalize for email input
- autoCorrect: we can disables auto-correct for email input

```js
<TextInput
  style={styles.textInput}
  placeholder="Your course goal!"
  onChangeText={goalInputHandler}
  value={value}
  maxLength={10}
  keybroadType="numeric"
  autoCapitalize="none"
  autoCorrect={false}
/>
```

`<Button>`

- use `onPress` prop in `<Button>` to listen to the click event.
- `<Button>` does not support `style` prop, but it supports `color` prop.

```js
<Button title="Add Goal" onPress={addGoalHandler} />
```

`<Pressable>` is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.

- use `onPressIn` prop in `<Pressable>` to listen to the press in event.
- onPress style change:
  - for android, we can use `android_ripple` prop to add ripple effect on press.
  - for iOS, we can use the `style` prop as a function, which receive the object has `pressed` property, so we can check if `pressed` is `true` to add the pressed style, often it will be `opacity: 0.X`.
- since we cannot do much customization on `<Button>`, if we do want to style our own button, you have to build with the `<Pressable>` component.

#### How to create custom buttons?

There's a common problem when building a custom button on Android: the ripple effect is outside of the button. -> We should move `<Pressable>` inside of `<View>`. Then we'll have,

- one outer container will be `<View />` holds the `<Pressable>`, we should have `borderRadius` and `overflow: "hidden"` in the style, which makes sure the ripple effect is inside of the button.
- one inner container will be `<Pressable>` holds `<Text>`

```js
const CustomButton = ({ title, children }) => {
  const handleOnPress = () => {};

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={handleOnPress}
        android_ripple={{ color: "#640233" }}
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed ? styles.pressed : null,
        ]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
```

`<Modal>`

- use `visible` prop to show or hide the modal.
- use `animationType` prop to set the animation type, 'none', 'slide or 'fade', of the modal.
- use `onRequestClose` prop to listen to the close event.

`<StatusBar>` is to control the app's status bar.

- use `style` prop to set the style of the status bar, 'auto', 'inverted', 'light' or 'dark'.

```js
import { StatusBar } from "expo-status-bar";

<StatusBar style="light" />;
```

`<Alert>` Launches an alert dialog with the specified title and message.

- use `Alert.alert()` to show the alert.

```ts
static Alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
);

type AlertButton = {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive'; // ios
};
```

```js
import { Alert } from "react-native";

Alert.alert("Invalid number!", "Number has to be a number between 1 and 99.", [
  { text: "Okay", style: "destructive", onPress: resetInputHandler },
]);
```

### Icons & Fonts

@expo/vector-icons is a expo embedded library that allows you to use icons from the popular icon libraries like Material Icons, Ionicons, Font Awesome, and Zocial.

```js
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  return (
    <View style={styles.container}>
      <Ionicons name="md-checkmark-circle" size={32} color="green" />
    </View>
  );
}
```

### Splash Screen & Loading Fonts

Splash Screen is the very first screen the users see when they open up an app on a mobile device. It's also been called launch screen. This is useful to do tasks that will happen behind the scenes such as making API calls, pre-loading fonts.

```js
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <Text>Hello world!</Text>
    </View>
  );
}
```

### Building Adaptive & Responsive UIs

- Adjust to different screen sizes with `Dimensions` API
- Adjust to different screen orientations with `Dimensions` API
- Execute platform-specific code with `Platform.OS` and `Platform.select()`

#### Setting Dynamic width

Set width and MaxWidth and the same time, so that it will try to take `width` until it reaches `maxWidth`.

```js
const styles = StyleSheet.create({
  container: {
    maxWidth: "80%",
    width: 300,
  },
});
```

#### Introduce `Dimensions` API

We can use `Dimensions` API to get the device width and height. And we can use it as the breakpoint to adjust the UI.

```js
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    marginTop: deviceWidth > 350 ? 34 : 26,
  },
});
```

## Debugging React Native Errors

### Chrome Inspector

we can choose 'Debug JS Remotely' from the developer menu(by command + D in iOS).

Then we can open the Chrome browser and go to `http://localhost:19000/debugger-ui/` to open the inspector. We can see the console, network tabs.

### React Dev Tools

You can use the standalone version of React Developer Tools to debug the React component hierarchy.

```bash
# install the react-devtools package globally
npm install -g react-devtools

# launch the standalone DevTools app:
react-devtools
```

It should connect to your simulator within a few seconds.

### Debugging application state

**Reactotron** allows you to inspect central store like Redux or MobX-State-Tree application state

### React Native Debugger

This is a standalone app for debugging React Native apps:

- Based on official Remote Debugger and provide more functionality.
- Includes React Inspector
- Includes Redux DevTools
- Includes Apollo Client DevTools

```bach
brew install --cask react-native-debugger
```

To enable network inspect tab, we can config `defaultNetworkInspect` option to true in the config file(in `~/.rndebuggerrc`).
