// --------------------------------- START --------------------------------- //
// Position index. We will use it in next steps. Here just initialization.
window.continueIndex = 0;
// Schedule Timeout. LinkedIn have some new connection limits. So we will trigger our function just once per 2 hours.
window.scheduleTimeout = 2 * 60 * 60 * 1000;
// How many times we will scroll down to load new contacts.
window.scrollDown = 8;

// Declare function with functional.
function scrollAndAddNewContacts() {
    new Promise(function (resolve) {
        var j;
        console.log("Scrolling start");
        for (j = 1; j < window.scrollDown; j++) {
            // Scroll down with timeout to load a lot of new contacts.
            console.log("Scroll #", j);
            setTimeout(function () {
                window.scrollTo(0, document.body.scrollHeight);
            }, j * 1000)
        }
        console.log("Scrolling end");
        // After we are in the bottom - resolve promise to move to next step.
        setTimeout(function () {
            resolve("resolved");
        }, window.scrollDown * 1200);
    }).then(function () {
        // All new contacts that can be added. After previous scrolling we will have something like 70+ new contacts.
        var addToContactButtonWrappers = document.getElementsByClassName("mt2");
        var contactsLength = addToContactButtonWrappers.length;
        var i;
        console.log("From: " + window.continueIndex + " To: " + contactsLength);
        for (i = window.continueIndex; i < contactsLength; i++) {
            (function () {
                var index = i;
                setTimeout(function () {
                    // Inside button-wrapper we have button - "Connect" - that we should click.
                    addToContactButtonWrappers[index].firstElementChild.click();
                    console.log("Added: " + index);
                }, index * 250)
            })();
            if (i + 1 === contactsLength) {
                window.continueIndex = contactsLength + 1;
            }
        }
    })
}

// Trigger add connections function.
scrollAndAddNewContacts();

// LinkedIn have some new connection limits. So we will trigger our function with some periods.
var k;
for (k = 1; k < 8; k++) {
    setTimeout(function () {
        scrollAndAddNewContacts();
    }, k * window.scheduleTimeout);
}
// Enjoy :)
// --------------------------------- END --------------------------------- //
