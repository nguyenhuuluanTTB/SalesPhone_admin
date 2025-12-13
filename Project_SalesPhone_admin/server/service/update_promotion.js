import { sequelize } from '../config/database.js';
import { QueryTypes } from 'sequelize';

async function update_promotion(id_promotion, data) {
    try {
        const [result] = await sequelize.query(
            `
            UPDATE promotion
            SET name_promotion = ?,
                percent = ?,
                start_at = ?,
                end_at = ?,
                describe_promotion = ?
            WHERE id_promotion = ?
            `,
            {
                replacements: [
                    data.name_promotion,
                    data.percent,
                    data.start_at,
                    data.end_at,
                    data.describe_promotion,
                    id_promotion
                ],
                type: QueryTypes.UPDATE
            }
        );

        return {
            success: true,
            message: 'Cập nhật khuyến mãi thành công'
        };
    } catch (err) {
        console.error('Error while updating promotion:', err);
        throw err;
    }
}

export default update_promotion;
