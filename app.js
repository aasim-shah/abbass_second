require('dotenv').config();
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose")
const axios = require('axios')
const bcrypt = require('bcrypt')
const User = require('./models/userModel')


// sets the view engine to EJS
app.set('view engine', 'ejs');

// directs Express to the public folder for stylesheets
app.use(express.static('public'));


// some important middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(session({
  secret: "mysuperSecret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }

}))



// mongodb connection
mongoose.connect('mongodb://0.0.0.0:27017/abbass_new', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => { console.log("DB Connected !") }).catch((e) => { console.log(e) })
  
  








// initializing passportjs

app.use(passport.initialize());
app.use(passport.session());




passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });

        if (!user) {
          return done(null, false);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);



passport.serializeUser(function (user, done) {
  return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});



const isAuthenticated = async (req, res, next) => {
  try {
    const reqToken = req.cookies.jwt_token
    const verify_user = jwt.verify(reqToken, 'mysuperSecret')
    const userFound = await User.findOne({ _id: verify_user._id, "tokens.token": reqToken })
    if (!userFound) {
      return res.redirect("/login")
    }
    req.user = userFound
    next()


  } catch (error) {
    console.log(error)
    res.redirect("/login")

  }
}

app.use(async (req, res, next) => {

  try {
    const reqToken = req.cookies.jwt_token
    const verify_user = jwt.verify(reqToken, 'mysuperSecret')

    const userFound = await User.findOne({ _id: verify_user._id, "tokens.token": reqToken })
    if (userFound) {
      res.locals.user = userFound;
      res.locals.form = null;
    } else {
      res.locals.user = null;
      res.locals.form = null;
    }
  } catch (error) {
    res.locals.user = null;
    res.locals.form = null;
  }
  next();
});










app.get('/', async (req, res) => {
  const {data} = await axios.get("https://dummyjson.com/products?limit=12")
    res.render('homepage' , {products : data.products});
  });
  
  app.get('/admin/login', (req, res) => {
    res.render('adminLogin');
  });
  app.get('/login', (req, res) => {
    res.render('login');
  });




  app.get('/loginErr', (req, res) => {
    res.render('loginErr');
  
  });




  app.get('/signup', (req, res) => {
    res.render("signup");  
  });
  
  
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/loginErr' }),
    async function (req, res) {
      const token = await req.user.AuthUser()
      res.cookie("jwt_token", token)
      if(req.user.isAdmin){
      return  res.redirect("/admin")
      }
      res.redirect("/")
  
    });


  
  
  
  app.post("/signup", async (req, res) => {
    const {  email, password, phone , fullname } = req.body;
  
    console.log(req.body)
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.send("user already exists ")
    }
 
  
  
    const passHash = await bcrypt.hash(password, 10)
    const reqBody = new User({
      fullname: fullname,
      email,
      phone,
      password: passHash,
    })
    const user = await reqBody.save()
    const token = await reqBody.AuthUser()
    res.cookie("jwt_token", token)
    res.redirect("/")
  })
  
  
  app.get('/profile', isAuthenticated, async (req, res) => {
 
    res.render('profile', );
  });

  
  

app.get('/logout', (req, res) => {
    res.clearCookie('jwt_token');
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });
  
  
  
  app.get("/*", (req, res) => {
    res.render("pageNotFound.ejs")
  })
  


app.get("/" ,(req,res) =>{
    res.send("homeapge")
})


app.listen(PORT, ()=>{
    console.log("server is running on " + PORT )
})