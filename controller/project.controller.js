import Project from '../model/project.model.js';

// Create a new project
export const createProject = async (req, res) => {
  const { title, description, mainImageUrl, location, otherImages , category } = req.body;

  if (!title || !description || !mainImageUrl || !location || !category) {
    return res.status(400).json({ message: 'Title, description, and mainImageUrl are required' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      mainImageUrl,
      otherImages: otherImages || [],
      category,
      location
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); 
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, mainImageUrl, otherImages, category, location } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, mainImageUrl, otherImages, category,location },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
};
