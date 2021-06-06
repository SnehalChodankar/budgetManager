var contextMenuItem = {
    "id":"spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isInt  (value){
    return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value,10));
}

chrome.contextMenus.onClicked.addListener(function(res){
    if(res.menuItemId == "spendMoney" && res.selectionText){
        if(isInt(res.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(result){
                var newTotal = 0;
                if(result.total){
                    newTotal += parseInt(result.total);
                }
                newTotal += parseInt(res.selectionText);

                chrome.storage.sync.set({'total': newTotal},function(){
                    if(newTotal >= result.limit){
                        var notifOptions = {
                            type: 'basic',
                            iconUrl:'./icons/budget48.png',
                            title: 'Limit reached!',
                            message: "Looks like you reached your limit!!!"
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                })
            })
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
})