const video = document.getElementById('video')

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
  const displaySize = { width: window.innerWidth, height: window.innerHeight }
  faceapi.matchDimensions(canvas, displaySize)

  const pointer = document.getElementById('pointer');
  setInterval(async () => {
    const face = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())

    if(face == undefined) return;

    if (face != undefined){
      
      const box = face.box;
      console.log(face)
      pointer.style.left = (canvas.style.left + box.left) + 'px';
      pointer.style.top = (canvas.style.top + box.top) + 'px';
    }

    const resizedDetections = faceapi.resizeResults(face, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})