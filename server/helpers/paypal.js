const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: "AUCSNrrl9His2zvpwmT7l8QvwImAaHf6rWX7HKZtggbQ7N8D4v9KBAmyEyS1b4zml2vRdGy2yKoqy9HD",
    client_secret: "EOVGskx49vfEKGek6dwRMvGvNJsraBa5bX2gK6-mjCFfQuA7IZ0QcChoOv5aGDiq1h6QZDdEnwIU_cBz",
});

module.exports = paypal;