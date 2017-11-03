const electron = require('electron');
const {
  ipcRenderer
} = electron;
const {
  remote
} = electron;
const clipboard = require('electron').clipboard;
const clipboardWatcher = require('electron-clipboard-watcher');
const desktopCapturer = electron.desktopCapturer
const electronScreen = electron.screen
const shell = electron.shell
const nativeImage = require('electron').nativeImage;

const fs = require('fs')
const os = require('os')
const path = require('path')


const screenshot = document.getElementById('screen-shot')
const screenshotMsg = document.querySelector('.screenshot-path')


var takeScreenshot = function(event) {
  //  screenshotMsg.textContent = 'Gathering screens...'
  console.log('Gathering Screens');
  const thumbSize = determineScreenShotSize()
  let options = {
    types: ['screen'],
    thumbnailSize: thumbSize
  }

  desktopCapturer.getSources(options, function(error, sources) {
    if (error) return console.log(error)

    sources.forEach(function(source) {
      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
        const screenshotPath = path.join(__dirname, 'screenshot.png')

        fs.writeFile(screenshotPath, source.thumbnail.toPng(), function(error) {
          if (error) return console.log(error)
          console.log(screenshotPath)
          var im = nativeImage.createFromPath(screenshotPath)
          const cpboard = require('electron').clipboard;
          cpboard.writeImage(im)
          //  console.log(im.toDataURL());
          shell.openExternal('file:///' + screenshotPath)
          const message = `Saved screenshot to: ${screenshotPath}`
          var image = document.getElementById('img');
          image.src = 'file:///' + screenshotPath
          //  screenshotMsg.textContent = message
          //  console.log(message);
        })
      }
    })
  })
}

function determineScreenShotSize() {
  const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio
  }
}

clipboardWatcher({
  watchDelay: 1000,
  onImageChange: function(nativeImage) {
    console.log("WATCHER DETECTED AN IMAGE")
    //var image = document.getElementById('img');
    let im = clipboard.readImage();
  //  image.src = imge.toDataURL()
  let myNotification = new Notification('Image On clipboard', {
  body: 'Theres A new Image In Town'
  })

  myNotification.onclick = () => {
  console.log('Oh Man')
  }

      for(var doc in app.document_clips){
        if(app.document_clips[doc].documentation_id === app.activedockey){
          var nextId = app.document_clips[doc].clips.length + 1
        //  var text = clipboard.readText('selection')
          var found = false

          for(var clip in app.document_clips[doc].clips){
                console.log(app.document_clips[doc].clips[clip].is_text);

                if(app.document_clips[doc].clips[clip].clip_text == clipboard.readImage().toDataURL()){
                  console.log("Yada Yada::: Copy");
                  found = true

                }

          }

          if(!found){
            console.log("Is Image");
            app.document_clips[doc].clips.push({
              "clip_id": nextId,
              "clip_name": "Image Screens ID"+ "..." + nextId,
              "clip_tag": "Bootstrap download lk",
              "clip_text": im.toDataURL(),
              "clip_description": "The functions you use text as a parameter to are Vanilla JavaScript methods, and so expect a DOM node rather than a jQuery object. \"This\" by itself in this case is a DOM node. But, wrapping it in $() turns it into a jQuery object, which is then unusable by the functions you call later on.  ",
              "clip_Slide": 1,
              "is_text": false,
              "is_primary": true,
              "clip_time": "Now",
              "clip_date": Date()
            })
          }

            }
      }

  },
  onTextChange: function(text) {
    console.log(clipboard.readText('selection'));
    console.log("WATCHER DETECTED TEXT")
    // var app = document.getElementById('app');
    // app.innerHTML = clipboard.readText('selection')


    let txtImg = clipboard.readText('selection')

    if (txtImg.replace(/"/g, '').replace(/-/g, '').replace(/ /g, '').match('((?:\\w:*(\\\\\\w+)+)(\\\\\\w+\.(png|jpg|PNG|JPG)))') != null) {
      console.log("WATCHER DETECTED AN IMAGE")
      var im = nativeImage.createFromPath(txtImg.replace(/"/g, ''));
      // console.log(im.toDataURL())
      //var image = document.getElementById('img');
      //image.src = "file:///" + txtImg.replace(/"/g, '');
      clipboard.writeImage(im)
        for(var doc in app.document_clips){
          if(app.document_clips[doc].documentation_id === app.activedockey){
            var nextId = app.document_clips[doc].clips.length + 1
            var text = clipboard.readText('selection')
            var found = false

            for(var clip in app.document_clips[doc].clips){
                  console.log(app.document_clips[doc].clips[clip].is_text);

                  if(app.document_clips[doc].clips[clip].clip_text == clipboard.readImage().toDataURL()){
                    console.log("Yada Yada::: Copy");
                    found = true
                  }

            }

            if(!found){
              console.log("Is Image");
              app.document_clips[doc].clips.push({
                "clip_id": nextId,
                "clip_name": "Image Screens ID"+ "..." + nextId,
                "clip_tag": "Bootstrap download lk",
                "clip_text": im.toDataURL(),
                "clip_description": "description Here",
                "clip_Slide": 1,
                "is_text": false,
                "clip_time": "Now",
                "clip_date": Date()
              })
            }

              }
        }

    } else {
      let myNotification = new Notification('Text Notification', {
      body: 'Theres A new Text In Town'
      })

      myNotification.onclick = () => {
      console.log('Oh Man')
      }

      for(var doc in app.document_clips){
        if(app.document_clips[doc].documentation_id === app.activedockey){
          var nextId = app.document_clips[doc].clips.length + 1
          var text = clipboard.readText('selection')
          var found = false

          for(var clip in app.document_clips[doc].clips){
                console.log(app.document_clips[doc].clips[clip].clip_id);
                if(app.document_clips[doc].clips[clip].clip_text == clipboard.readText('selection')){
                  console.log("Yada Yada");
                  found = true
                }

          }

          if(!found){
            console.log("Is Text");
            app.document_clips[doc].clips.push({
              "clip_id": nextId,
              "clip_name": text.substring(0,20)+ "..." + nextId,
              "clip_tag": "Bootstrap download lk",
              "clip_text": clipboard.readText('selection'),
              "clip_description": "Add a description here",
              "clip_Slide": 1,
              "is_text": true,
              "is_primary": true,
              "clip_time": "Now",
              "clip_date": Date()
            })
          }

            }
      }

    }
    //console.log(txtImg.replace('"','').replace('"','').match('[a-zA-Z]+\.(png)'))

  }
})
