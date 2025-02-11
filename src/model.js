const video = document.getElementById('video')
const pointer = document.getElementById('pointer');
pointer.hidden = true;

let cursor = {
  x: 0,
  y: 0
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  // faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

async function startVideo() {
  try{
    stream = await navigator.mediaDevices.getUserMedia({video:{}});
    video.srcObject = stream;
  }
  catch(err){
    console.error(err)
  }
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)

  const aspectRatio = video.videoWidth / video.videoHeight;
  const canvasLeft = (window.innerWidth - window.innerHeight * aspectRatio) / 2
  canvas.style.left = canvasLeft + 'px';

  const displaySize = { width: window.innerHeight * aspectRatio, height: window.innerHeight }
  // const displaySize = {width: canvas.width, height: canvas.height};
  // console.log(displaySize, window.innerWidth, canvas);
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    const face = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())

    pointer.hidden = false;

    if(face == undefined) return;

    const resizedDetections = faceapi.resizeResults(face, displaySize)

    const box = resizedDetections.box;

    cursor.x = (canvasLeft + displaySize.width - box.x - box.width / 2);
    cursor.y = (box.top + box.height / 2 - 22);

    pointer.style.left = (cursor.x - 22) + 'px';
    pointer.style.top = (cursor.y - 22) + 'px'
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})