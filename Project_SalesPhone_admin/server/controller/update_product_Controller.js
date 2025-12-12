import update_product_truyvan from '../service/update_product.js';

const update_product = async (req, res) => {
    try{
        const productData = req.body;

        const result = await update_product_truyvan(productData);
        res.json(result);
    }
    catch(err){
        console.error('Error in update_product controller: ', err);
        res.status(500).json({
            success: false,
            message: 'Error server while updating product =(('
        });
    }
}

export default update_product;