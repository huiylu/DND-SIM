module.exports=(req,res,next)=>{
    if(req.user){
        next();
    } else {
        console.log('No');
        res.redirect('/auth/login');
    }
}