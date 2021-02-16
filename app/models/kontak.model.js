module.exports = (sequelize, Sequelize) => {
    const Kontak = sequelize.define("kontak", {
        //nama field databasenya
        nama: {
            type: Sequelize.STRING
        },
        no_hp: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
    // dengan sequelize juga dia otomatis bikin id, timestamp seperti create_at & update_at
    return Kontak;
}