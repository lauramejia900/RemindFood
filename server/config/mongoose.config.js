const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/piratas", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log("Conectado a db"))
.catch(err => console.log("Hay error al conecatr la db", err))