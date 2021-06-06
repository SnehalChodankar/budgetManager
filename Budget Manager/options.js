$(function(){

    chrome.storage.sync.get('limit', function(res){
        if(res.limit){
            $('#limit').val(res.limit);
        }
    });

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit':limit}, function(){
                console.log("Limit set!");
                alert("Limit set!");
                close();
            });
        }
    });

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0}, function(){
            console.log('total reset!');
            var notifOptions = {
                type: 'basic',
                iconUrl:'./icons/budget48.png',
                title: 'Total Reset!',
                message: "Your Total spending was successfully reset to 0!!!"
            };
            chrome.notifications.create('limitNotif', notifOptions);
        });
    });
});