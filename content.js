var last_target = null;
document.addEventListener('mousedown', function(event){ 
  last_target = event.target;
}, true);

chrome.runtime.sendMessage({todo: "showExtension"});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "getLink"){	
        //console.log(last_target);  
        var temp = $(last_target).parentsUntil("div._5pcr");
        last_target = undefined;
        temp = $(temp).find('embed').attr('flashvars');
        var decodedUrl = decodeURIComponent(temp);
		decodedUrl = decodedUrl.match(/params=(.*)&width/)[1];
		decodedUrl = jQuery.parseJSON( decodedUrl );
        //console.log(decodedUrl);		
        var fName = decodedUrl.video_data.progressive.video_id+".mp4";
        if(decodedUrl.video_data.progressive.hd_src_no_ratelimit !== null && decodedUrl.video_data.progressive.hd_src_no_ratelimit !== undefined){
            vType = 'HD No Rate Limit';
		    decodedUrl = decodedUrl.video_data.progressive.hd_src_no_ratelimit;
        }else if(decodedUrl.video_data.progressive.hd_src !== null && decodedUrl.video_data.progressive.hd_src !== undefined){
		    decodedUrl = decodedUrl.video_data.progressive.hd_src;
            vType = 'HD SRC';
		}else if(decodedUrl.video_data.progressive.sd_src_no_ratelimit !== null && decodedUrl.video_data.progressive.sd_src_no_ratelimit !== undefined){
            decodedUrl = decodedUrl.video_data.progressive.sd_src_no_ratelimit;
            vType = 'SD No Rate Limit';
        }else if(decodedUrl.video_data.progressive.sd_src !== null && decodedUrl.video_data.progressive.sd_src !== undefined){
		    decodedUrl = decodedUrl.video_data.progressive.sd_src;
            vType = 'SD SRC';
		}else{
		    decodedUrl = '';
            vType = 'Not Available';
		}
        //console.log(decodedUrl);
        //console.log(vType);   
        chrome.runtime.sendMessage({
            todo: "download", 
            url: decodedUrl, 
            fileName: fName
        });
	}
});