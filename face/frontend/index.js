import "babel-polyfill"
import * as tf from '@tensorflow/tfjs';
import {Webcam} from './webcam';

const canvas_elm = document.getElementById("myCanvas");
const webcam_elm = document.getElementById('webcam')
const tag_elm = document.getElementById('tags')
const webcam = new Webcam(webcam_elm, canvas_elm);


var caputure_btn = document.getElementById('do_capture')
caputure_btn.addEventListener('click', () => {
    webcam.capture()
    send_img_to_server()

})

async function init() {
    //console.log('aa')
    var a = null;
    try {
        a = await webcam.setup();
    } catch (e) {
        console.log('catch')
        document.getElementById('no-webcam').style.display = 'block';
    }
    //console.log(a)
}


async function send_img_to_server(){
    var loader = document.getElementById("loader");
    loader.style = 'display: inline';

    var image_data = canvas_elm.toDataURL();

    var url = "/api/image_upload";
    var formData = new FormData()
    formData.append('image_data', image_data )

    try {
        let content = await fetch( url, {
            method: 'POST',
            body: formData
        })
        let json = await content.json();
        loader.style = 'display: none';
        tag_elm.innerHTML = json
    } catch (err){
        loader.style = 'display: none';
        alert('Sorry, Exception detected')
    }


}


// Initialize the application.
init();