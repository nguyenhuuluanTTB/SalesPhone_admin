import { sequelize} from '../config/database.js';

async function unable_account_tryvan (id_user){
    try{
        const result = await sequelize.query(
            `
                update user_account 
                set enable = 0
                where id_user = ?
            `,
            {replacements: [id_user]}
        );
        return result;
    }
    catch(err){
        console.error('DB query error: ', err);
    }
};

export default unable_account_tryvan;