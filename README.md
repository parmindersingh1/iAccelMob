Your Ionic project is ready to go! Some quick tips:

* cd into your project:
```
cd iAccelMobile
```

* Setup this project to use Sass:
```
ionic setup sass
```

* Develop in the browser with live reload:
```
ionic serve
```

* Add a platform (ios or Android):
```
ionic platform add ios [android]
```

Note: iOS development requires OS X currently
See the Android Platform Guide for full Android installation instructions:
https://cordova.apache.org/docs/en/edge/guide_platforms_android_index.md.html

* Build your app:
```
ionic build <PLATFORM>
```

* Simulate your app:
```
ionic emulate <PLATFORM>
```

* Run your app on a device:
```
ionic run <PLATFORM>
```

* Package an app using Ionic package service:
```
ionic package <MODE> <PLATFORM>
```

For more help use ```ionic --help``` or visit the Ionic docs: http://ionicframework.com/docs


You can find the documentation here: http://bit.ly/ionicthemes-ionfullapp


* Firebase Notification

--    All you need is to add this 3 plugin

    ⁠⁠⁠ionic plugin add cordova-plugin-inappbrowser --save
    ionic plugin add cordova-plugin-fcm --save
    ionic plugin add cordova-plugin-velda-devicefeedback --save

--  Requirements

      Android Support Library version 23 or greater
      Android Support Repository version 20 or greater
      Google Play Services version 27 or greater
      Google Repository version 22 or greater

--  Add Platform to ionic ios/android
      cordova platform add ios --save
      cordova platform add android --save

--  Create New Project at firebase console (http://console.firebase.google.com/)

      Add a Name to your project
      Select which platform you like (ios/android)    
      Add your Package Name which is the id of your app, (you can see it in your config.xml something like id="com.ionicframework.someTest123") It will give you a file google-services.json
      Paste it in the platforms/android/ directory
      Then run ionic build android on your CLI

--  Go to Notifications menu in sidebar of firebase console and select app id and send message for tseting.
