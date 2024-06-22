module.exports = (sequelize, Sequelize) => {
    const Patients = sequelize.define("patients",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            createdBy: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            firstName: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            lastName: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            dob: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
        },
        {
            paranoid: true, // Enable soft deletes
            deletedAt: 'deletedAt', // Specify the column name for deletion timestamp
        }
    );

    return Patients;
};