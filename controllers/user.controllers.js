// project imports
const UserSchema = require('../models/user.model');


/* @DESC   registerUser -----------------------------------------------------------------------------------
*  @ROUTE  POST /
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
module.exports.register = async(req, res, next) => {
    try{
        const { email, username, password } = req.body;
        const user           = await new UserSchema({ email, username });
        const registeredUser = await UserSchema.register(user, password);

        // Make sure we login and register at the same time.
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
} 

/* @DESC   loginUser --------------------------------------------------------------------------------------
*  @ROUTE  POST /
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
module.exports.login = async(req, res) => {
    req.flash('success', `Welcome Back to YelpCamp ${req.user.username}!`);

    // Put url on session so when the have to login they return to original page they were on.
    const redirectUrl = req.session.returnTo || '/campgrounds';  

    delete req.session.returnTo;

    res.redirect(redirectUrl);
}

/* @DESC   RenderRegister ---------------------------------------------------------------------------------
*  @ROUTE  GET /
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
module.exports.renderRegister = (req, res) => {
    res.render('pages/register');
}

/* @DESC   RenderLogin ------------------------------------------------------------------------------------
*  @ROUTE  GET /
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
module.exports.renderLogin = (req, res) => {
    res.render('pages/login');
}

/* @DESC   logoutUser -------------------------------------------------------------------------------------
*  @ROUTE  POST /
*  @ACCESS public  
*---------------------------------------------------------------------------------------------------------*/
module.exports.logout = (req, res) => {
    req.logout();

    req.flash('success', "Goodbye!")
    res.redirect('/campgrounds');
}