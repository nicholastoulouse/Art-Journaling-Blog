const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }), //, {failureRedirect: "/", session: false }
  (req, res) => {
    console.log("authRoutes.js /auth/google/callback", req.user);
    // res.redirect('/');
    if (process.env.NODE_ENV === "production") {
      res.redirect("/");
    } else {
      res.redirect("http://localhost:3000");
    }
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  // res.redirect('/');
  if (process.env.NODE_ENV === "production") {
    res.redirect("/");
  } else {
    res.redirect("http://localhost:3000");
  }
});

router.get("/whoami", (req, res) => {
  console.log("index /whoami req.user", req.user);
  res.json(req.user || {});
});

module.exports = router;

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/", session: false }),
//   function(req, res) {
//       var token = req.user.token;
//       res.redirect("http://localhost:3000?token=" + token);
//   }
// );
