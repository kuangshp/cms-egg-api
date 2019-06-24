'use strict';
const Base64 = require('Base64');
// { btoa: [Function], atob: [Function] }
console.log(Base64.btoa('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImFlNWRmOWQ3LTJiMzUtNGRjNi04NzY2LWE1NDE1NGYxZjEyZSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiMzMyOTA0MjM0QHFxLmNvbSIsIm1vYmlsZSI6IjE4MTcwNjAxNjY2IiwiZ2VuZGVyIjoxLCJjcmVhdGVfYXQiOiIyMDE5LTA2LTI0VDA1OjMxOjA0LjAwMFoiLCJ1cGRhdGVfYXQiOiIyMDE5LTA2LTI0VDA1OjMxOjA0LjAwMFoiLCJpYXQiOjE1NjEzNTQ5NTYsImV4cCI6MTY0Nzc1NDk1Nn0.bBpwe0PKhvGEbibSlH-DK6q-SqPxJmvSdLmt2YVABtM'));
console.log(Base64.atob(Base64.btoa('hello word')));
