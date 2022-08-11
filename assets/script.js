document.getElementById('mybutton').addEventListener('click', () => {
  // ccall params: name of C function, return type, argument types, arguments
  // const result = Module.ccall(
  //   'myFunction1',
  //   'number',
  //   'number',
  //   2,
  // );

  // console.log('result:', result);

  const int_sqrt = Module.cwrap('int_sqrt', 'number', ['number'])
  console.log('int_sqrt(12):', int_sqrt(12));
  console.log('int_sqrt(28):', int_sqrt(28));
});
