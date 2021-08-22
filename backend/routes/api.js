const router = require("express").Router();
const apiUsuariosRouter = require("./api/users.routes");
const apiProfilesRouter = require("./api/profiles.routes")
router.use("/usuarios", apiUsuariosRouter);
router.use("/profiles", apiProfilesRouter)
module.exports = router;
