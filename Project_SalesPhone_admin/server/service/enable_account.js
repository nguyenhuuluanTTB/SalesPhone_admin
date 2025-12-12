import {sequelize} from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function enable_account_truyvan (id_user){
    try{
        const result = await sequelize.query(
            `
                update user_account
                set enable = true
                where id_user = ?
            `,
            {
                replacements: [id_user],
                type: QueryTypes.UPDATE
            }
        );
        return result;
    }
    catch(err){
        console.error('Error DB query: ', err);
        throw err;
    }
}

export default enable_account_truyvan;