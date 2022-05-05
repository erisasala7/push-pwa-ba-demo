const PUBLIC_VAPID_KEY =
    "BJOV9XGc6SPbGanxU8nPZoBsWR3IXxaK5j8MjGxiLd9LL5QtTrdKIuTlDOMYViqnwN4UkerTlQvKjN6BYkAQ-zQ";

const subscription = async() => {
    // Service Worker
    console.log("Registering a Service worker");
    const register = await navigator.serviceWorker.register("https://erisasala7.github.io/push-pwa-ba-demo/src/public/worker.js", {
        scope: "https://erisasala7.github.io/push-pwa-ba-demo/src/public/"
    });
    console.log("New Service Worker");

    // Listen Push Notifications
    console.log("Listening Push Notifications");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    console.log(subscription);

    // Send Notification
    await fetch("/subscription", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("Subscribed!");
    not();
};

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// UI

function not() {

    this.setTimeout(() => {
        let myTable = document.querySelector('#table');
        let headers = ['Datum', 'Uhrzeit', 'Fehlermeldung'];
        let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        headers.forEach(headerText => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
        this.setInterval(() => {
            var today = new Date();
            var date;
            var dateTime;

            var myArray = [
                "FM1",
                "FM2",
                "FM3",
            ];

            var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
            fetch('/new-message', {
                method: 'POST',
                body: JSON.stringify({ message: randomItem }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
            dateTime = date + ' ' + time;
            jsonData = [{
                username: date,
                club: time,
                category: randomItem
            }];
            setTimeout(() => {
                jsonData.forEach(emp => {
                    let row = document.createElement('tr');
                    Object.values(emp).forEach(text => {
                        let cell = document.createElement('td');
                        let textNode = document.createTextNode(text);
                        cell.appendChild(textNode);
                        row.appendChild(cell);
                    })
                    table.appendChild(row);
                });
            }, 2000);

            myTable.appendChild(table);
        }, 10000);

    }, 1);


}


// Service Worker Support
if ("serviceWorker" in navigator) {
    subscription().catch(err => console.log(err));
}