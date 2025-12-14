import enable_account_tryvan from "../service/enable_account.js";

async function enable_account (req, res){
    try{
        const id_user = req.body.id_user;
        console.log('id_user: ',id_user);
        const result = await enable_account_tryvan(id_user);
        res.json({success: true});
    }
    catch(err){
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export default enable_account;