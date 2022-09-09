# WASM CPP TEST

```
/mnt/d/_Projects/Other_projects/emsdk/upstream/emscripten/em++ src/main.cpp -O3 -sWASM=1 \
  -sEXPORTED_RUNTIME_METHODS='["cwrap"]' -sASSERTIONS -sLLD_REPORT_UNDEFINED \
  -sEXPORTED_FUNCTIONS='["_version", "_create_buffer", "_destroy_buffer", "_encode", "_free_result", "_get_result_pointer", "_get_result_size"]' \
  -I/mnt/d/LIBS/opencv/build/include \
  -lopencv_core \
  -L/mnt/d/_Projects/Other_projects/opencv/build/lib \
  -oassets/main.js
```
