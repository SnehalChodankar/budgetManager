$(function(){

    chrome.storage.sync.get(['total','limit'], function(res){
        $('#total').text(res.total);
        $('#limit').text(res.limit);
    });

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(res){
            var newTotal = 0;
            if(res.total){
                newTotal += parseInt(res.total); 
            }

            var ammount = $('#amount').val();
            if(ammount){
                newTotal += parseInt(ammount);
            }

            chrome.storage.sync.set({'total':newTotal}, function(){
                console.log("amount updated!");
                if(ammount && newTotal >= res.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl:'./icons/budget48.png',
                        title: 'Limit reached!',
                        message: "Looks like you reached your limit!!!"
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});