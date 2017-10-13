var fs = require('fs');
var cheerio = require('cheerio'),
$ = cheerio.load(fs.readFileSync('test2.mht'));
var clip = []
var LineByLineReader = require('line-by-line');
    var lr = new LineByLineReader('test2.mht');
    lr.on('error', function (err) {
    	// 'err' contains error object
    });
    var flag = false,
    count = 0,
    obj= [],
    content = "",
    tag ="",
    title = ""

    lr.on('line', function (line) {

    //    line = line.replace(tag/g,"")
    	// pause emitting of lines...
    	//lr.pause();
    //console.log("Im a line......." + line);
    	// ...do your asynchronous line processing..
    	// setTimeout(function () {
        if(line.startsWith("--=_NextPart_")){
            //console.log("Yup! IT does!!!");
            tag = line
        }
        if(line == 'Content-Type: image/jpeg'){
            obj.push({name: title, url: content})
            content = ""
            console.log("Yada Yada");
            count = 0
            flag = true
        }
        if(flag){
            if(count == 2){
                title= line.substring(18)
                console.log(line.substring(18));

            }
            count = count + 1
        }
        if(count > 3){
            flag = false
            line = line.replace(tag,'')
            content = content + line
        }

    	// 	// ...and continue emitting lines.
    	// //	lr.resume();
    	// }, 100);
    });

    lr.on('end', function () {
obj.push({name: title, url: content})
        //console.log(obj);
        var documentHTML = fs.createWriteStream('test3.html', {
    flags: 'w'
  })
        $('#Steps div').each(function(i, elem){
        //    console.log(obj.length);
        for(var image in obj){

            if($(this).find('a').find('img').attr('src') == obj[image].name){
                //console.log("Yada Yada: " + obj[image].name);
                 //  console.log($(this).find('a').find('span').text());
                 //  console.log($(this).find('p').next().html());
                documentHTML.write(`<div title="User left click on &quot;Select Command Prompt (window)&quot; in &quot;Select Command Prompt&quot;" tabindex="0">
                <p><span class="accessible-text">`+$(this).find('a').find('span').text()+`</span></p>
                    <p>`+$(this).attr('title')+`</p>
                    <a><img src="data:image/png;base64,`+obj[image].url+`"></a>
                    <hr aria-hidden="true"/>
                </div>`)
                   clip.push({clip_name: $(this).find('a').find('span').text(), clip_text: obj[image].name, clip_description: $(this).attr('title')})
            }

        }
        //    console.log($(this).find('a').find('img').attr('src'));
        })
        documentHTML.end()



        console.log(clip);
    	// All lines are read, file is closed now.
    });
//$('li[class=orange]').html()


//console.log($('#Steps').html());
