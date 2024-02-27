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
const User = require('./models/userModel');
const morgan = require("morgan")

const cors = require("cors")
const upload = require('./utils/multer')
const Post = require('./models/postModel');


// sets the view engine to EJS
app.set('view engine', 'ejs');

// directs Express to the public folder for stylesheets
app.use(express.static('public'));
app.use( "/our_posts" , express.static('public'));



const stripe = require('stripe')('sk_test_51KiiRNDs0edGSqAmcnTPzbYm945ppuerWhPzkCi0WBfRG60KWfciQtD4my0bpr0QjiJl7VcC4UTBfTPfbK1atdVD00S3PmIUI8');
// stripePubKey = pk_test_51KiiRNDs0edGSqAmL8OvoU596SpjoJKVhMUbikYZM3ScPS2A7U2Loi2g3GTAvTvTek1d6fznTmAZDk6hywJw6dFn003tYT4BES



// Middleware to capture raw body
app.use(
  '/webhook',
  bodyParser.raw({type: 'application/json'}),
  (req, res, next) => {
    req.rawBody = req.body;
    next();
  }
);
// some important middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

app.use(session({
  secret: "mysuperSecret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }

}))



// mongodb connection
// mongoose.connect('mongodb://0.0.0.0:27017/abbass_new', {
  mongoose.connect("mongodb+srv://asim:mardan8110@cluster0.btwlh.mongodb.net/quick_buzinesx?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => { console.log("DB Connected !") }).catch((e) => { console.log(e) })
  
  






  app.use(morgan('tiny'));


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
  const {data} = await axios.get("https://api.slingacademy.com/v1/sample-data/blog-posts?limit=10")
  const posts =  await Post.find({})
  const mergedArray = [...data.blogs, ...posts];
    res.render('homepage' , {blogs : mergedArray});
  });






  app.post('/initatePayment', async (req, res) => {
    try {
      const { amount } = req.body; // you should calculate the amount on the server to prevent manipulation
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // amount in the smallest currency unit, e.g., cents for USD
        currency: 'usd',
        // add other relevant payment intent properties
      });
      
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  
  
  
  
  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  const endpointSecret = "whsec_kGtoxhIdUItD5lVKQOAKpU6FSh7qYiDZ";
  app.post('/webhook', (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    console.log({sig})
    console.log({body : request.body})
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
      console.log({event})
    } catch (err) {
      console.log({err})
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  

    
    // Handle the event
    switch (event.type) {
      case 'payment_intent.amount_capturable_updated':
        const paymentIntentAmountCapturableUpdated = event.data.object;
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        console.log(event.data.object)
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        const paymentIntentProcessing = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = event.data.object;
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log(event.data.object)
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  
  
  
  
  







app.get('/blogs/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const post = await Post.findById(req.params.id)
    res.render('postDetails' , {blog : post});
} else {
  const {data} = await axios.get("https://api.slingacademy.com/v1/sample-data/blog-posts/"+req.params.id)
 return res.render('postDetails' , {blog : data.blog});
}
  
  });
  



  // admin
  app.get('/admin', isAuthenticated, async (req, res) => {
    if(!req.user.isAdmin){
      res.redirect("/adminLogin")
    }
    const users = await User.find()
    res.render('admin' ,{users});
  });

  app.get('/admin/login', (req, res) => {
    res.render('adminLogin');
  });

  // posts
  app.get('/create', (req, res) => {
    res.render('createPost');
  });
  
app.post('/create', isAuthenticated, upload.single("photo_url")  , async (req, res) => {
  console.log(req.file)
  try {
      const { title, description , category  , content_html} = req.body;

      const newPost = new Post({
          username: req.user.fullname, 
          title,
          content_html,
          category,
          photo_url : "/uploads/"+req.file.filename,
          description,
          userRef : req.user._id,
      });
      newPost.id = newPost._id
      await newPost.save();

      res.redirect('/user/posts'); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/user/posts', isAuthenticated, async (req, res) => {
    const posts =  await Post.find({userRef : req.user._id})
    res.render('post-details' , {posts});
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