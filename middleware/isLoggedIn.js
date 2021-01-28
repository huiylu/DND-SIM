module.exports=(req,res,next)=>{
    if(req.username){
        next();
    } else {
        console.log('No');
        res.redirect('/auth/login');
    }
}