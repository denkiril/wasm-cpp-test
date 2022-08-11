#include <stdio.h>
#include <math.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
  printf("Frontenders rules!\n");
  return 0;
}

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

// EXTERN EMSCRIPTEN_KEEPALIVE void myFunction1(int argc, char ** argv) {
//   printf("MyFunction Called\n");
// }

EXTERN int int_sqrt(int x) {
  return sqrt(x);
}
