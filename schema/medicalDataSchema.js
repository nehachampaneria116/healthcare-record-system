module.exports = (sequelize, Sequelize) => {
    const MedicalData = sequelize.define("medicalData",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            uploadedBy: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            patientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            file: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        },
        {
            paranoid: true, // Enable soft deletes
            deletedAt: 'deletedAt', // Specify the column name for deletion timestamp
        }
    );

    return MedicalData;
};