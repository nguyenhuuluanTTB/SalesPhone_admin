import {sequelize} from '../config/database.js';

async function view_info_product_TruyVan (id_product) {
    try{
        const [result] = await sequelize.query(
            `
                select * from detail_product
                left join product_image on detail_product.id_product = product_image.id_product
                left join product on detail_product.id_product = product.id_product
                left join promotion on product.id_promotion = promotion.id_promotion
                where detail_product.id_product = ?
                LIMIT 1;
            `,
            {
                replacements: [id_product]
            }
        );
        return result[0];
    }
    catch(err){
        console.error('DB query error: ', err);
    }
}

export default view_info_product_TruyVan;