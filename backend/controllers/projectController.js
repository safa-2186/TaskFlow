const db = require("../db");

// GET /projects
exports.getProjects = (req, res) => {
  try {
    const projects = db.projects.findByUser(req.user.id);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /projects
exports.createProject = (req, res) => {
  const { name, description, color } = req.body;
  if (!name) return res.status(400).json({ message: "Project name is required." });
  try {
    const id = db.projects.create({ name, description, color, user_id: req.user.id });
    db.activity.log(req.user.id, `Created project "${name}"`);
    res.status(201).json({ id, message: "Project created." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /projects/:id
exports.updateProject = (req, res) => {
  const id = parseInt(req.params.id);
  const project = db.projects.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  if (project.user_id !== req.user.id) return res.status(403).json({ message: "Forbidden." });
  try {
    db.projects.update(id, req.body);
    res.json({ message: "Project updated." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /projects/:id
exports.deleteProject = (req, res) => {
  const id = parseInt(req.params.id);
  const project = db.projects.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  if (project.user_id !== req.user.id) return res.status(403).json({ message: "Forbidden." });
  try {
    db.projects.delete(id);
    db.activity.log(req.user.id, `Deleted project "${project.name}"`);
    res.json({ message: "Project deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /projects/:id/tasks
exports.getProjectTasks = (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const allTasks = db.tasks.findByUser(req.user.id);
    console.log("user_id:", req.user.id);
    console.log("project_id recherché:", id);
    console.log("toutes les tâches:", JSON.stringify(allTasks));
    const tasks = allTasks.filter(t => t.project_id === id);
    console.log("tâches filtrées:", JSON.stringify(tasks));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
