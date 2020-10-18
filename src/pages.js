var Database = require("./database/db");
var saveData = require("./database/saveData");

module.exports = {
  index: function (req, res) {
    return res.render("index");
  },
  orphanage: async function (req, res) {
    var id = req.query.id;

    try {
      var db = await Database;
      var dataOrphanage = await db.all(`SELECT * FROM orphanages WHERE id ='${id}'`);
      var orphanage = dataOrphanage[0];

      orphanage.images = orphanage.images.split(",")
      orphanage.firstImage = orphanage.images[0]

      if(orphanage.open_on_weekends == "0"){
        orphanage.open_on_weekends = false
      } else {
        orphanage.open_on_weekends = true
      }

      return res.render("orphanage", { orphanage });

    } catch (error) {
      console.log(error);
      return res.send("deu ruim");
    }
  },
  orphanages: async function (req, res) {
    try {
      var db = await Database;
      var dataset = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { dataset });
    } catch (error) {
      console.log(error);
      return res.send("deu ruim");
    }
  },
  createOrphanage: function (req, res) {
    return res.render("create-orphanage");
  },

  saveData: async function (req, res) {
      var fieldCheck = req.body

      //validar o preenchimento de todos os campos
      if (Object.values(fieldCheck).includes('')) {
        return res.send('Todos os campos devem ser preenchidos!')
      }

      //salvar um orfanato
      try {
        var db = await Database 
        var newData = {
          lat: fieldCheck.lat,
          lng: fieldCheck.lng,
          name: fieldCheck.name,
          about: fieldCheck.about,
          whatsapp: fieldCheck.whatsapp,
          images: fieldCheck.images.toString(),
          instructions: fieldCheck.instructions,
          opening_hours: fieldCheck.opening_hours,
          open_on_weekends: fieldCheck.open_on_weekends
        }

      await saveData(db, newData)
      
      //redirecionamento
      return res.redirect('/orphanages')
      } catch (error) {
        console.log(error);
        return res.send("deu ruim");
      }
      

  }
}