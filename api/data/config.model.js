const mongoose = require("mongoose");
const configSchema = mongoose.Schema({

    key: String,
    value: String

});

configSchema.index({'$**': 'text'});

mongoose.model("config", configSchema);