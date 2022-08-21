const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

class Votes extends Model {}

    Votes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        
        // What goes here?
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },

            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'post',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'votes'
        }
    );

    module.exports = Votes;