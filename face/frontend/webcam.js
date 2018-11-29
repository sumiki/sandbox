
export class Webcam {
    /**
     * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
     */


    constructor(webcamElement, canvasElement) {
        this.webcamElement = webcamElement;
        this.canvas = canvasElement
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Captures a frame from the webcam and normalizes it between -1 and 1.
     * Returns a batched image (1-element batch) of shape [1, w, h, c].
     */
    capture() {
        this.canvas.width = this.webcamElement.width;
        this.canvas.height = this.webcamElement.height;
        this.ctx.drawImage(this.webcamElement, 0,0, this.webcamElement.width, this.webcamElement.height);
    }


    /**
     * Adjusts the video size so we can make a centered square crop without
     * including whitespace.
     * @param {number} width The real width of the video element.
     * @param {number} height The real height of the video element.
     */
    adjustVideoSize(width, height) {
        const aspectRatio = width / height;
        if (width >= height) {
            this.webcamElement.width = aspectRatio * this.webcamElement.height;
        } else if (width < height) {
            this.webcamElement.height = this.webcamElement.width / aspectRatio;
        }
    }

    async setup() {

        return new Promise((resolve, reject) => {
            const navigatorAny = navigator;

            navigator.getUserMedia = navigator.getUserMedia ||
                navigatorAny.webkitGetUserMedia ||
                navigatorAny.mozGetUserMedia ||
                navigatorAny.msGetUserMedia ||
                navigatorAny.mediaDevices

            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    {
                        audio: false,
                        video: {facingMode: 'environment'}
                    },
                    stream => {
                            this.webcamElement.srcObject = stream;
                            console.log(this.webcamElement)
                            this.webcamElement.addEventListener('loadeddata', async () => {
                                    this.adjustVideoSize(
                                    this.webcamElement.videoWidth,
                                    this.webcamElement.videoHeight);
                                    resolve();

                            }, false);
                    },
                    error => {
                        reject();
                    });
            } else {
                reject();
            }
    });
    }
}
