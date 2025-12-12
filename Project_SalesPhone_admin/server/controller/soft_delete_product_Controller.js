import {sequelize} from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function soft_delete_truyvan (id_product){
    try{
        const result = await sequelize.query(
            `
                UPDATE product 
                    SET is_del_phone = 1
                WHERE id_product = ?
            `,
            {
                replacements: id_product,
                type: QueryTypes.UPDATE
            }

        );
        return {
            success: true,
            message: 'Đã xóa sản phẩm thành công'
        }
    }
    catch(err){
        console.error('Error DB query: ', err);
        throw err;
    }
}

export default soft_delete_truyvan;