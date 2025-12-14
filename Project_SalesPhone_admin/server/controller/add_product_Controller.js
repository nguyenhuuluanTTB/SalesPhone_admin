import addProduct_TruyVan from "../service/add_product.js";

async function addProduct(req, res) {
    try{
        const result = await addProduct_TruyVan(req.body);
        res.json({success: true, data: result});
    }
    catch(err){
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export default addProduct;
