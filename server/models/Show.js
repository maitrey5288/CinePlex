const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
      
    },
    date :{
        type : Date,
     
    },
    type : {
        type : String,
        enum : ['2D','3D']

    },
    seats: { type: Map, of: new mongoose.Schema({
      status: String,
     date : Date,
    }), default: {} },
    movie :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Movie",
    },
    theatre:{
      type : mongoose.Schema.Types.ObjectId,
        ref : "Theatre",
    }
 


})
showSchema.index({ date: 1 }, { expireAfterSeconds: 86400  });
showSchema.pre('save', function (next) {
    // 'this' refers to the show being saved
    if (this.isNew) { 
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      const columns = Array.from({ length: 16 }, (_, i) => (i + 1).toString());
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)
      rows.forEach(row => {
        columns.forEach(column => {
          const seatId = `${row}${column}`;
          
          this.seats.set(seatId, {status:'unbooked',date:yesterday});
        });
      });
    }
    next();
  });

 


  


module.exports = mongoose.model("Show", showSchema)