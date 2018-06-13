/*

Highcharts Editor v0.1.3

Copyright (c) 2016, Highsoft

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
highed.plugins.editor.install("jquery-simple-rest",{meta:{version:"1.0.0",author:"Highsoft",homepage:"https://github.com/highcharts/highcharts-editor/plugins/jquery-simple-rest.js"},dependencies:["https://code.jquery.com/jquery-3.1.0.min.js"],options:{url:{required:!0,type:"string"}},chartchange:function(e,t){jQuery.ajax({url:t.url,data:e.json,dataType:"json",type:"post",success:function(){highed.snackBar("CHART SAVED")},error:function(e,t){highed.snackBar("unable to save chart: "+t)}})}});