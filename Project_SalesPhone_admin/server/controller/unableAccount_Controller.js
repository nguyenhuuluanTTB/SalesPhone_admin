import unable_account_tryvan from "../service/unable_account.js";

const unable_account = async (req, res) => {
    try{
        const id_user = req.body.id_user;
        const result = await unable_account_tryvan(id_user);
        res.json({success: true});
    }catch(err){
        res.status(500).json({success: false, message: 'Server error'});
    }
};

export default unable_account;