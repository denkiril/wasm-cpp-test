function logApiError() {
  console.error('No api function!');
}

let api = {
  version: logApiError,
  create_buffer: logApiError,
  destroy_buffer: logApiError,
  encode: logApiError,
  free_result: logApiError,
  get_result_pointer: logApiError,
  get_result_size: logApiError,
};

function initApi() {
  api = {
    version: Module.cwrap('version', 'number', []),
    create_buffer: Module.cwrap('create_buffer', 'number', ['number', 'number']),
    destroy_buffer: Module.cwrap('destroy_buffer', '', ['number']),
    encode: Module.cwrap('encode', '', ['number','number','number','number',]),
    free_result: Module.cwrap('free_result', '', ['number']),
    get_result_pointer: Module.cwrap('get_result_pointer', 'number', []),
    get_result_size: Module.cwrap('get_result_size', 'number', []),
  };
}

function onMyButtonClick() {
  // ccall params: name of C function, return type, argument types, arguments
  // const result = Module.ccall(
  //   'parse_image',
  //   'number',
  //   ['number'],
  //   [100],
  // );
  // console.log('parse_image result:', result);

  // const int_sqrt = Module.cwrap('int_sqrt', 'number', ['number'])
  // console.log('onMyButtonClick opencv version:', api.version());
  testWasm();
}

async function getImageData(file) {
  const img = await createImageBitmap(file);
  // Make canvas same size as image
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  // Draw image onto canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  return ctx.getImageData(0, 0, img.width, img.height);
}

function showResult(bytes) {
  console.log('showResult');
  // console.log(bytes);
  const blob = new Blob([bytes], {type: 'image/bmp'});
  const blobURL = URL.createObjectURL(blob);
  const imgEl = document.createElement('img');
  imgEl.src = blobURL;
  imgEl.className = 'image'
  document.getElementById('mainContainer').appendChild(imgEl);
}

function drawResult(bytes) {
  console.log('drawResult');
  // bytes = [27,32,26,28,33,27,30,35,29,31,50,20,50,60,50,80,81,82,83];
  // const canvas = document.getElementById('canvasOutput');
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, 100, 100);
  imageData.data.set(new Uint8ClampedArray(bytes)); // assuming values 0..255, RGBA, pre-mult.
  ctx.putImageData(imageData, 0, 0);
  // console.log(imageData.data);

  document.getElementById('canvasContainer').appendChild(canvas);
}

async function onImageLoad(e) {
  const file = e.target.files[0];
  console.log('onImageLoad file:', file);

  const image = await getImageData(file);
  console.log('image', image);
  const {width, height, data} = image;
  const p = api.create_buffer(width, height);
  Module.HEAP8.set(data, p);
  console.log('Module.HEAP8', Module.HEAP8);
  api.encode(p, width, height, 100);
  processWasm();
  api.destroy_buffer(p);
}

function testWasm() {
  console.log('testWasm');
  api.version();
  processWasm();
}

function processWasm() {
  console.log('processWasm...');
  const resultPointer = api.get_result_pointer();
  console.log('resultPointer', resultPointer);
  const resultSize = api.get_result_size();
  console.log('resultSize', resultSize);
  // console.log('Module.HEAP8.buffer', Module.HEAP8.buffer);
  const resultView = new Uint8Array(Module.HEAP8.buffer, resultPointer, resultSize);
  console.log('resultView', resultView);
  const result = new Uint8Array(resultView);
  api.free_result(resultPointer);
  
  // showResult(result);
  drawResult(result);
}

// function onDateCardFieldChange(e) {
//   let {value} = e.target;
//   // value = '02.2023';
//   console.log('onDateCardFieldChange value:', value);
//   const TUI_EXP_SAFARI = /^\d{1,4}.\d{1,2}.\d{1,4}$/;
//   console.log('value regexp test:', TUI_EXP_SAFARI.test(value));
//   console.log('value len:', value.length);
// }

function init() {
  Module.onRuntimeInitialized = async () => {
    console.log('Module.HEAP8', Module.HEAP8);
    initApi();
    console.log('INIT! opencv version:', api.version());
    processWasm();
    document.getElementById('myButton').addEventListener('click', testWasm);
    // document.getElementById('imgInput').addEventListener('change', onImageLoad);
    // document.getElementById('dateCardField').addEventListener('change', onDateCardFieldChange);
  };
}

window.addEventListener('load', init);
