import {sequelize} from '../config/database.js'
import { QueryTypes } from "sequelize";

async function addProduct_TruyVan(data){
    const t = await sequelize.transaction();

    try{
        console.log("DATA:", data);

        // INSERT PRODUCT
        const [newProductId] = await sequelize.query(
            `
            INSERT INTO product 
            (name_product, price, type, brand, quantity, status, product_code, rate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            {
                replacements: [
                    data.name_product,
                    data.price,
                    data.type,
                    data.brand,
                    data.quantity,
                    data.status,
                    data.product_code,
                    4.8
                ],
                type: QueryTypes.INSERT,
                transaction: t
            }
        );

        console.log("NEW PRODUCT ID:", newProductId);

        if (!newProductId) throw new Error("Không lấy được insertId từ bảng product");

        // INSERT DETAIL PRODUCT
        await sequelize.query(
            `
            INSERT INTO detail_product 
            (id_product, color, rom, ram, screen_size, battery, 
             description_phone, warranty, front_camera, rear_camera, 
             cpu_detail, operating_system, chip_nfc, resolution, 
             screen_frequency, video)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            {
                replacements: [
                    newProductId,
                    data.color,
                    data.rom,
                    data.ram,
                    data.screen_size,
                    data.battery,
                    data.description_phone,
                    data.warranty,
                    data.front_camera,
                    data.rear_camera,
                    data.cpu_detail,
                    data.operating_system,
                    data.chip_nfc,
                    data.resolution,
                    data.screen_frequency,
                    data.video
                ],
                type: QueryTypes.INSERT,
                transaction: t
            }
        );

        // INSERT IMAGE
        await sequelize.query(
            `
            INSERT INTO product_image (id_product, image_url, is_main)
            VALUES (?, ?, ?)
            `,
            {
                replacements: [
                    newProductId,
                    data.image_url,
                    1
                ],
                type: QueryTypes.INSERT,
                transaction: t
            }
        );

        await t.commit();

        return {
            success: true,
            message: "Thêm sản phẩm thành công!",
            id_product: newProductId
        };

    }
    catch(err){
        await t.rollback();
        console.error('DB query error', err);
        throw err;
    }
}

export default addProduct_TruyVan;
