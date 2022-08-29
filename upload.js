

g_dirname1 = ''
g_object_name1 = ''
g_object_name1_type = ''
now = timestamp = Date.parse(new Date()) / 1000;

var policyText1 = {
    "expiration": "2040-12-01T12:00:00.000Z", 
    "conditions": [
        ["content-length-range", 0, 3048576000] 
    ]
};
accessid= 'jHIUCCxXvLZWuTxlj9ApTA';
accesskey= 'UU6Ma132Tzs+evzGIm0kMQ5Vco3E9/0ng6qes49vZTA';
host = 'https://hikyun.oss-cn-beijing.aliyuncs.com';

var policyBase65 = Base64.encode(JSON.stringify(policyText1))
message1 = policyBase65
var bytes1 = Crypto.HMAC(Crypto.SHA1, message1, accesskey, { asBytes: true }) ;
var signature1 = Crypto.util.bytesToBase64(bytes1);

function check_object_radio1() {
    var tt = document.getElementsByName('myradio1');
    for (var i = 0; i < tt.length ; i++ )
    {
        if(tt[i].checked)
        {
            g_object_name1_type = tt[i].value;
            break;
        }
    }
}

//设置上传目录
function get_dirname1()
{
     dir = document.getElementById("dirname1").value;
   // dir ='';
    if (dir != '' && dir.indexOf('/') != dir.length - 1)
    {
        dir = dir + '/'
    }
    g_dirname1 = dir
}

function random_string1(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix1(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name1(filename)
{
    if (g_object_name1_type == 'local_name')
    {
        g_object_name1 += "${filename}"
    }
    else if (g_object_name1_type == 'random_name')
    {
        suffix = get_suffix1(filename)
        g_object_name1 = g_dirname1 + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name1(filename)
{
    if (g_object_name1_type == 'local_name')
    {
        tmp_name = g_object_name1
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if(g_object_name1_type == 'random_name')
    {
        return g_object_name1
    }
}

function set_upload_param1(up, filename, ret)
{
    g_object_name1 = g_dirname1;
    if (filename != '') {
        suffix = get_suffix1(filename)
        calculate_object_name1(filename)
    }
    new_multipart_params = {
        'key' : g_object_name1,
        'policy': policyBase65,
        'OSSAccessKeyId': accessid,
        'success_action_status' : '200', 
        'signature': signature1,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}
var timer1,tryTime1,maxTry1=5,delay1=3000,num=0;
var uploader1 = new plupload.Uploader({//在文件里引入了一个 plupload前端上传插件
    runtimes : 'html5,flash,silverlight,html4',
    browse_button : 'selectfiles1',
    //multi_selection: false,
    container1: document.getElementById('container1'),
    flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    url : 'http://oss.aliyuncs.com',
    init: {
        PostInit: function() {
            document.getElementById('ossfile1').innerHTML = '';
            document.getElementById('postfiles1').onclick = function() {
                set_upload_param1(uploader1, '', false);
                return false;
            };
        },

        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                if(num==0){
                    document.getElementById('ossfile1').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        +'<div class="progress"><div class="progress-bar" style="width:0%"></div></div>'
                        +'</div>';
                    num++;
                }else{
                    return false;
                }

            });
        },

        BeforeUpload: function(up, file) {
            check_object_radio1();
            get_dirname1();
            set_upload_param1(up, file.name, true);
        },

        UploadProgress: function(up, file) {
            var d = document.getElementById(file.id);
            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
            var progBar = prog.getElementsByTagName('div')[0]
            progBar.style.width= 5*file.percent+'px';
            progBar.setAttribute('aria-valuenow', file.percent);
        },

        FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
                tryTime1 = 0;
                // timer1 = setInterval(getDuration1, delay1);
                // videoElem = document.getElementById("au");
                // videoElem.innerHTML = '<source class="source" src="'+host+'/'+file.name+'" type="video/mp4">';
                // videoElem.play();
                $("#audioUrl").val(host+"/"+file.name+"");
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name1(file.name);
            }
            else
            {
                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
            }
        },

        Error: function(up, err) {
            document.getElementById('console1').appendChild(document.createTextNode("\nError xml:" + err.response));
        }
    }
});

function getDuration1() {
    clearInterval(timer1);
    var hour = parseInt((au.duration)/3600);
    var minute = parseInt((au.duration%3600)/60);
    var second = Math.ceil(au.duration%60);
    $("#showByNones").show();
    $("#lengthTime1").val(hour+":"+minute+":"+second);
    var lengthTime = $("#lengthTime").val();
    if (lengthTime == null || lengthTime == "") {
        $("#showByNones2").show();
        $("#lengthTime").val(hour+":"+minute+":"+second);
    }
}
uploader1.init();

