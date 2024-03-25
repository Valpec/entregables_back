// import { Router } from "express";

// const router = Router()

// router.get("/login", (req, res) => {
//     if(req.session.user){
//         console.log(`del router de sessio`)
//         res.render('login')
//     }else{
//         res.send(`Ya esta logueado`)
//     }
// });

// router.get("/register", (req, res) => {
//     if(req.session.user){
//         res.render('register')
//     }else{
//         // res.send(`Ya esta logueado`)
//     }
// });

// router.get("/", (req, res) => {
//     res.render('profile', {
//         user: req.session.user
//     })
// });

// export default router;