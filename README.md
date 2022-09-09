# WASM CPP TEST

Try it: https://denkiril.github.io/wasm-cpp-test/

## Develop
### Requirements
* emsdk - https://emscripten.org/docs/getting_started/downloads.html
* opencv - https://docs.opencv.org/4.x/d4/da1/tutorial_js_setup.html (with builded wasm in wsl)
* wsl (for Windows 10+)

```
/mnt/d/_Projects/Other_projects/emsdk/upstream/emscripten/em++ src/main.cpp -O3 -sWASM=1 \
  -sEXPORTED_RUNTIME_METHODS='["cwrap"]' -sASSERTIONS -sLLD_REPORT_UNDEFINED \
  -sEXPORTED_FUNCTIONS='["_version", "_create_buffer", "_destroy_buffer", "_encode", "_free_result", "_get_result_pointer", "_get_result_size"]' \
  -I/mnt/d/LIBS/opencv/build/include \
  -lopencv_core \
  -L/mnt/d/_Projects/Other_projects/opencv/build/lib \
  -oassets/main.js
```
