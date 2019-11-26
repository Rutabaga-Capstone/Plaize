import React from 'react';
import { View, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js'
// import * as mobilenet from '@tensorflow-models/mobilenet'


export default class CameraExample extends React.Component {
    state = {
        isTfReady: false,
        predictions: null,
        image: null
    };

    imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3)
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset]
            buffer[i + 1] = data[offset + 1]
            buffer[i + 2] = data[offset + 2]
            offset += 4
        }
        return tf.tensor3d(buffer, [height, width, 3])
    }

    async componentDidMount() {

        await tf.ready();
        this.setState({ isTfReady: true });
 
        const modelJson    = require('../model-export/icn/ml_model/model.json');
        const modelWeights = require('../model-export/icn/ml_model/weights.bin');

        model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));

        const img = require('../assets/images/poison_oak.jpeg')
        // const img = require('../assets/images/poisonivy_large.jpg')

        const imageAssetPath = Image.resolveAssetSource(img)
        const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })


        //----------------------- this is a workaround for 
        // [Unhandled promise rejection: Error: FileReader.readAsArrayBuffer is not implemented]
        // Looks like response.arrayBuffer() invokes FileReader.readAsArrayBuffer
        // which is not implemented on mobile environment ???
        FileReader.prototype.readAsArrayBuffer = function (blob) {
            if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
            this._setReadyState(this.LOADING);
            this._result = null;
            this._error = null;
            const fr = new FileReader();
            fr.onloadend = () => {
                const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
                const buffer = new ArrayBuffer(content.length);
                const view = new Uint8Array(buffer);
                view.set(Array.from(content).map(c => c.charCodeAt(0)));
                this._result = buffer;
                this._setReadyState(this.DONE);
            };
            fr.readAsDataURL(blob);
        }
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        const atob = (input = '') => {
            let str = input.replace(/=+$/, '');
            let output = '';

            if (str.length % 4 == 1) {
                throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
            }
            for (let bc = 0, bs = 0, buffer, i = 0;
                buffer = str.charAt(i++);

                ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
            ) {
                buffer = chars.indexOf(buffer);
            }

            return output;
        }
        //-----------------------

        const rawImageData = await response.arrayBuffer() 

        let imageTensor = this.imageToTensor(rawImageData)
        const smalImg = tf.image.resizeBilinear(imageTensor, [224, 224]);
        const resized = tf.cast(smalImg, 'float32');
        const t4d = tf.tensor4d(Array.from(resized.dataSync()), [1, 224, 224, 3])

        model.predict(t4d).print(true)

        // Here is the output
        // Tensor
        // dtype: float32
        // rank: 2
        // shape: [1,7]
        // values:
        //    [[0, 0, 0.000289, 0.9946737, 0.0050446, 0, 0],]

    }

    render() {
        console.log("isTfReady", this.state.isTfReady)
        return (
            <View style={{ flex: 1 }}>
            </View>
        );
    }
}