module.exports = app => {
    const kontaks = require("../controllers/kontak.controller.js");

    let router = require("express").Router();

    // Create a new kontak
    router.post("/buat", kontaks.create);

    // Retrieve all kontaks
    router.get("/daftar", kontaks.findAll);

    // Retrieve single kontak
    router.get("/daftar/:id", kontaks.findOne);

    // Update kontak
    router.put("/ubah/:id", kontaks.update);

    // Delete single kontak
    router.delete("/hapus/:id", kontaks.delete);

    // Delete All kontaks
    router.delete("/hapus", kontaks.deleteAll);

    app.use("/", router);
}