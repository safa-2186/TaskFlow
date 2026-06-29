const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/projectController");
const auth    = require("../middleware/authMiddleware");


router.get("/",           auth, ctrl.getProjects);
router.post("/",          auth, ctrl.createProject);
router.put("/:id",        auth, ctrl.updateProject);
router.delete("/:id",     auth, ctrl.deleteProject);
router.get("/:id/tasks",  auth, ctrl.getProjectTasks);


module.exports = router;