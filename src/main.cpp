#include <stdio.h>
// #include <stdlib.h> // required for malloc definition
#include <math.h>
#include <emscripten/emscripten.h>
#include "opencv2/opencv.hpp"
#include "opencv2/core.hpp"

using namespace std;
using namespace cv;

int result[2];

int main(int argc, char ** argv) {
  printf("From cpp: Frontenders rules!\n");
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

EXTERN void test() {
  uint8_t* img_out;
  size_t size;

  Mat r = Mat(100, 100, CV_8UC4);
  randu(r, Scalar::all(0), Scalar::all(255));

  // img_out = (uint8_t*)&r;
  img_out = r.data;
  size = r.total() * r.elemSize();

  result[0] = (int)img_out;
  result[1] = size;
}

// EMSCRIPTEN_KEEPALIVE
EXTERN int version() {
  test();
  return CV_VERSION_MAJOR;
}

// EMSCRIPTEN_KEEPALIVE
EXTERN uint8_t* create_buffer(int width, int height) {
  // return (uint8_t*) malloc(width * height * 4 * sizeof(uint8_t));
  return new uint8_t[width * height * 4 * sizeof(uint8_t)];
}

// EMSCRIPTEN_KEEPALIVE
EXTERN void destroy_buffer(uint8_t* p) {
  free(p);
}

// EMSCRIPTEN_KEEPALIVE
EXTERN void encode(uint8_t* img_in, int width, int height, float quality) {
  uint8_t* img_out;
  size_t size;

  // size = WebPEncodeRGBA(img_in, width, height, width * 4, quality, &img_out);
  // img_out = img_in;
  // size = width * height * 4 * sizeof(uint8_t);

  Mat r = Mat(10, 10, CV_8UC3);
  randu(r, Scalar::all(0), Scalar::all(255));
  cout << "r (default) = \n" << r << ";" << endl << endl;
  // cout << "r (matlab) = \n" << format(r, Formatter::FMT_MATLAB) << ";" << endl << endl;
  // cout << "r (python) = \n" << format(r, Formatter::FMT_PYTHON) << ";" << endl << endl;
  // cout << "r (numpy) = \n" << format(r, Formatter::FMT_NUMPY) << ";" << endl << endl;
  // cout << "r (csv) = \n" << format(r, Formatter::FMT_CSV) << ";" << endl << endl;
  // cout << "r (c) = \n" << format(r, Formatter::FMT_C) << ";" << endl << endl;
  img_out = (uint8_t*)&r;
  size = r.elemSize();

  result[0] = (int)img_out;
  result[1] = size;
}

// EMSCRIPTEN_KEEPALIVE
EXTERN void free_result(uint8_t* result) {
  // WebPFree(result);
  printf("free_result (cpp)\n");
  free(result);
}

// EMSCRIPTEN_KEEPALIVE
EXTERN int get_result_pointer() {
  return result[0];
}

// EMSCRIPTEN_KEEPALIVE
EXTERN int get_result_size() {
  return result[1];
}

// EXTERN int parse_image(int x) {
// // EXTERN int parse_image(uint8_t *buffer, size_t size){
//   // cv::Mat raw_data = cv::Mat(1, size, CV_8UC1, buffer);
//   Mat output = Mat::zeros( 120, 350, CV_8UC3 );

//   // cv::cvtColor(raw_data, raw_data, cv::COLOR_RGB2GRAY);
//   return 2;
// }
