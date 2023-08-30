const jwt = require("jsonwebtoken")

//ข้อมูล username, password
exports.login=(req,res)=>{
    const {Username,Password} = req.body
    if(Password === process.env.PASSWORD){
        //login เข้าสู่ระบบ
        const token = jwt.sign({Username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,Username})
    }else{
        return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง"})
    }
    res.json({
        Username,Password
    })
}


