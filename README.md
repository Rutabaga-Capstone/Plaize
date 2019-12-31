# Plaze

Plaze is a mobile app Proof of Concept that let's you identify plants with one click. It crowd-sources the identification of poisonous plants so that you can hike, walk your dogs, and travel without worrying about dangerous plants like poison ivy and locoweed being on your path. Successfully identified plants earn you 'leaves', earn enough and you'll rank up to a master explorer! Take a picture to identify a plant, check the map to see poisonous plants near you, and check your profile screen to see your progress so far.

## Demo video

Check out our demo video [here](https://www.youtube.com/watch?v=d2Bnvun6II4&list=PLx0iOsdUOUmnTCO5wLzNNeaLbbZLlngp6&index=33&t=0s)!
Special thanks to Fullstack Academy for the taping and production of our demonstration video!

## Installation

Currently installation is tricky due to a lack of deployment on iOS and Android. We are in the process of making a .ipa and a .apk for easy downloads for testing purposes. In the meantime if you'd like to test the app on your phone, you can use the Expo product to test it with just a few minutes of your time, and little hassle. First download this repository by typing `git clone https://github.com/Rutabaga-Capstone/Plant__-Rutabaga` in your shell or command prompt. Ensure you have npm installed, or follow the directions [here](https://www.npmjs.com/get-npm). Change directories into Plant\_\_Rutabaga/client and run `npm install`.
Ensure you have the expo CLI installed on you machine. If you don't, run `npm install -g expo-cli` in your terminal or follow the directions [here](https://docs.expo.io/versions/latest/get-started/installation/). On your phone, go to the Apple or Google Play Store and download the Expo app.
Once the install has completed, run `npm start` or `expo start` to get started. A browser tab will appear with a QR code to scan. Ensure you are on the same wifi on your phone as you are on your machine running the Expo CLI. Open up Expo on your mobile device and go to the 'projects' page. Click the 'Scan QR code' button and position your camera to scan the QR code. Once recognized, the app will be downloaded onto your device temporarily and you can see all of the functionality of our app. The process of running npm start or expo start will be needed to run our app until the update with downloadable versions comes out. Until then, thank you for your patience, and enjoy!

## Next steps

* [ ] Create a .apk for easy downloads for Android users
* [ ] Create a .ipa for easy downloads for iPhone users
* [ ] Move our machine learning model for plant identification from Google Cloud AutoML to device with tensorflow.js
* [ ] Fix styling for older devices using percentages and device-specific encoding
* [ ] Alter backend data collection for cheaper storage of identified plant pins information
* [ ] Allow for multiple plants to be associated with a single pin to allow for more clear and fluid map/pin traversal.

## Notes

Currently, due to the cost of hosting a deployed machine learning model on Google Cloud, we cannot afford the actual machine learning algorithm to be hosted 24/7. While the code allows users to identify different plants, until we can figure out a way to host the visualization identification model on the device itself, all pictures will be recognized as poison ivy.

### Contributors

This app was made by a team of four people from Fullstack Academy, Chicago, IL.
Randy Dobbins: randy@ArtsyArtys.com
Fernando DeLeon: fer@innovaresip.com
Sean Duff: gatewaywebdesign18@gmail.com
Pawel Bala: pawel3ala@gmail.com

Special thanks to Collin Miller and Finn Terdal (Instructors) and Tom Sinovich (Mentor/Fellow) for the training and guidance to make this possible.

### Legal Notes

This app is not to be used as a alternative to CDC or any poison identification/control center. This app and it's creators are not responsible for the incorrect identification of plants, or their potential harms for users, pets, or children. If you or someone else has eaten, consumed, or otherwise come in contact with a potentially dangerous substance, please contact the poison control center at 1-800-222-1222, or online at https://triage.webpoisoncontrol.org/#/exclusions.
