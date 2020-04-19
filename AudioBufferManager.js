/* 
  Author: Phill Phelps
  This code provides a convenient way to load audio into a AudioBuffer
*/

//
function AudioBufferManager(_audioContext) {
    this.buffers = new Array(); // initially empty
    this.audioContext = _audioContext;
};

// each call to this function generates a new entry in the .buffers array
// e.g. the following code
//
// AudioBufferManager.createBuffer("some/path/to/a/sound.mp3")
// AudioBufferManager.buffers[0] // will be created
//
// AudioBufferManager.load("another/sound.mp3")
// AudioBufferManager.buffers[1] // will be created
//
AudioBufferManager.prototype.createBufferFor = function(_sourceAudioUrl)
{
    var parentManager = this;
    
    var httpRequest = new XMLHttpRequest(); // a http request to load the sound file mp3 data
    httpRequest.open("GET", _sourceAudioUrl, true);
    httpRequest.responseType = "arraybuffer";
    
    // callback to decode the mp3 data when the request loads
    function decode(){
        parentManager.audioContext.decodeAudioData(httpRequest.response, fillBuffer);
    }
    
    // callback to fill our audio buffer with the decoded mp3 sound data
    function fillBuffer(buffer) {
        parentManager.buffers.push(buffer);
    }
    
    // set up the decoding callback and send the request
    httpRequest.onload = decode;
    httpRequest.send();

    return "AudioBufferManager will load " + _sourceAudioUrl;
}

AudioBufferManager.prototype.load = AudioBufferManager.prototype.loadBuffer;