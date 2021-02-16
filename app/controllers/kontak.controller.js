const db = require("../models");
const Kontak = db.kontaks;

// Untuk menentukan kondisi seperti where, like dll
const Op = db.Sequelize.Op;


// Create
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nama) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    // Create kontak
    const kontak = {
        nama: req.body.nama,
        no_hp: req.body.no_hp,
        email: req.body.email 
    }

    Kontak.create(kontak)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occureed while creating the kontak"
            })
        });
};

// Retrieve all
exports.findAll = (req, res) => {
    const nama = req.query.nama;
    let condition = nama ? {
        nama: {
            [Op.like]: `%${nama}%`
        }
    } : null;

    Kontak.findAll({
            where: condition
        })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while find kontak"
            });
        });
};

// Find a single
exports.findOne = (req, res) => {
    const id = req.params.id;

    // finByPk adalah metode yg ada di sequelize
    Kontak.findByPk(id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: "Error retrieving kontak with id=" + id
            })
        });
};

// Update with ID
exports.update = (req, res) => {
    const id = req.params.id;

    Kontak.update(req.body, {
        where: {
            id: id
        }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Kontak was updated successfully"
            });
        } else {
            res.send({
                message: "Cannot updated Kontak with id=${id}"
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating Kontak with id=" + id
        })
    });
};

// Delete kontak
exports.delete = (req, res) => {
    const id = req.params.id;

    Kontak.destroy({
        where: {
            id: id
        }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: "Kontak was deleted successfully"
            });
        } else {
            res.send({
                message: `Cannot delete Kontak with id=${id}`
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete Kontak with id=" + id
        })
    });
};

// Delete All
exports.deleteAll = (req, res) => {
    Kontak.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: `${result} Kontak was deleted successfully`
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while removing all Kontaks"
        })
    });
};