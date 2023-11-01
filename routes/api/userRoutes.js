const express = require("express");

const tryCatchWrapper = require("../../utils/controllerWrapper");
const {auth} = require("../../utils/auth.js");
const upload = require("../../middlewares/uploadDir.js");

const {
    userRegister,
    userLogin,
    userLogout,
    userAll,
    userCurrent,
    userAvatars,
    userGetAvatars,
    userVerificationEmail,
    resendVerificationEmail
  } = require("../../controllers/users");

const router = express.Router();

router.get("/", auth, tryCatchWrapper(userAll));

router.get("/current", auth,  tryCatchWrapper(userCurrent));

router.post("/register", tryCatchWrapper(userRegister));

router.post("/login",  tryCatchWrapper(userLogin));

router.post("/logout", auth,  tryCatchWrapper(userLogout));

router.get("/avatars", auth, tryCatchWrapper(userGetAvatars));

router.patch("/avatars", auth, upload.single("avatar"), tryCatchWrapper(userAvatars));

router.get("/verify/:verificationToken", tryCatchWrapper(userVerificationEmail));

router.post("/verify", tryCatchWrapper(resendVerificationEmail))

module.exports = router;