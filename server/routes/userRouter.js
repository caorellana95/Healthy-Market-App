const { Router } = require("express");
const { session } = require("passport");
const passport = require("passport");
const {
  getUsersController,
  registerController,
  loginController,
  RegisterGoogle,
  deleteUserController,
  loginGoogle,
} = require("../controllers/userController");
const moment = require("moment");
const { User } = require("../models/User");

const userRouter = Router();

const successRedirectUrl = "http://localhost:5000/users/google/success";
const failureRedirectUrl = "http://localhost:5000/users/google/error"

userRouter.get("/", getUsersController);
userRouter.post("/register", registerController);
userRouter.post("/loggin", loginController);
userRouter.get(
  "/google",
  passport.authenticate("google"),
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: failureRedirectUrl,
  }),
  RegisterGoogle
);

userRouter.get(
  "/succes",
  (req, res) => {
    res.send(req.user);
}
);



userRouter.get("/stats", async (req, res) => {
  const previusMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const users = await User.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previusMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.delete("/:userId", deleteUserController);

module.exports = userRouter;
