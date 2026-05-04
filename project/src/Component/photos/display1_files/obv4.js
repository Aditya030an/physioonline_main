function OnlineBooking(params) {
    var id = params.id,
    container = document.getElementById(params.container);
    if(!container) {
        return false;
    }

    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled){ 
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
    }


    container.style.height = '980px';
    var iframe = document.createElement('iframe');
    var urlParams = {
        id: id
    };
    
    if(typeof params.clinicLocation != 'undefined') {
        urlParams.location = params.clinicLocation;
    }
    if(typeof params.appointmentType != 'undefined') {
        urlParams.appointment = params.appointmentType;
    }
    if(typeof params.practitioner != 'undefined') {
        urlParams.practitioner = params.practitioner;
    }

    var paramParts = [
        'iframe-host='+encodeURIComponent(window.location.href)
    ];
    for(key in urlParams) {
        paramParts.push(key+'='+encodeURIComponent(urlParams[key]));
    }
    var paramString = paramParts.join('&');
    iframe.src = 'https://ob.rushcliff.com/iframe/'+id+'?'+paramString;

    if(!cookieEnabled) {
        iframe.src = 'https://ob.rushcliff.com/iframe/no-cookie';   
    }

    iframe.setAttribute('sandbox', 'allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation allow-top-navigation-by-user-activation allow-storage-access-by-user-activation');

    iframe.setAttribute('frameborder','0');
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    container.appendChild(iframe);
    window.addEventListener('message',function(e) {
        if(e.origin = 'https://ob.rushcliff.com') {
            container.style.height = e.data.obHeight+'px';
        }
    });
}

if(typeof window.ppsOnlineBooking == 'function') {
    window.ppsOnlineBooking();
}