const router = require("express").Router();
const apiUsuariosRouter = require("./api/users.routes");
router.use("/usuarios", apiUsuariosRouter);
module.exports = router;
