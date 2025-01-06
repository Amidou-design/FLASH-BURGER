let order = [];
let total = 0;

function addToOrder(item, price) {
    const existingItem = order.find((o) => o.name === item);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        order.push({ name: item, price: price, quantity: 1 });
    }

    total += price;
    updateOrder();
}

function updateOrder() {
    const orderList = document.getElementById("order-list");
    const totalDisplay = document.getElementById("total");

    orderList.innerHTML = "";
    order.forEach((item) => {
        orderList.innerHTML += `
            <div>
                <span>${item.name} x${item.quantity}</span>
                <button onclick="removeItem('${item.name}', ${item.price})">Retirer</button>
            </div>
        `;
    });

    totalDisplay.textContent = total;
}

function removeItem(item, price) {
    const existingItem = order.find((o) => o.name === item);

    if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity--;
        total -= price;

        if (existingItem.quantity === 0) {
            order = order.filter((o) => o.name !== item);
        }
    }

    updateOrder();
}

function finalizeOrder() {
    if (order.length === 0) {
        alert("Votre commande est vide !");
        return;
    }

    const orderSummary = order
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ");
    alert(`Commande confirmée : ${orderSummary}\nTotal : ${total} FCFA`);
}
function sendOrder(orderDetails) {
    const dbRef = firebase.database().ref("orders");
    dbRef.push(orderDetails);
    alert("Commande envoyée avec succès !");
}

document.getElementById("order-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const orderDetails = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        order: document.getElementById("order").value,
    };
    sendOrder(orderDetails);
});