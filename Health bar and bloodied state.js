let setHealthBarCommand = '!SetHealthBar';

// Change this to the bar that represents health:
if (!state.healthBar) {
    setHealthBar(1);
}

// Functions to output the bars based on 
function getBarValueName() {
    return state.healthBar + "_value";
}

function getBarMaxName() {
    return state.healthBar + "_max";
}

function setHealthBar(bar) {
    state.healthBar = 'bar' + bar;
    log("Set health bar to be " + state.healthBar)
}


on("chat:message", function(msg) {
    var message = msg.content;
    log(msg)
    
    if (message.startsWith(setHealthBarCommand)) {
        var args = message.substring(setHealthBarCommand.length + 1);

        if(!args || (args != '1' && args != '2' && args != '3')) {
            sendChat(msg.who, "/w " + msg.who + " Usage: " + setHealthBarCommand + " [1|2|3]\n/w " + msg.who + "Sets the bar that is used for automatically assigning the bloodied and dead state.")
        } else {
            setHealthBar(args)
            sendChat(msg.who, "/w " + msg.who + " Set health bar to be " + state.healthBar)
        }
    }
})

on("change:graphic", function(obj) {
    if(obj.get(getBarMaxName()) === "") 
        return;
   
    if(obj.get(getBarValueName()) <= obj.get(getBarMaxName()) / 2) {
        obj.set({
            status_redmarker: true
        });
    }
    else{
        obj.set({
            status_redmarker: false
        })
    }

    if(obj.get(getBarValueName()) <= -10) {
        obj.set({
            status_dead: true
        });
    }
    else {
        obj.set({
            status_dead: false
        });
    }
});