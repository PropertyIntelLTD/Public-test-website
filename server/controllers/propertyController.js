
// Temporary storage (will be replaced with database)
let properties = [];

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = properties.find(p => p.id === req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
export const createProperty = async (req, res) => {
  try {
    const property = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    properties.push(property);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
export const updateProperty = async (req, res) => {
  try {
    const index = properties.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    properties[index] = {
      ...properties[index],
      ...req.body,
      updatedAt: new Date()
    };
    
    res.json(properties[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
export const deleteProperty = async (req, res) => {
  try {
    const index = properties.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    properties = properties.filter(p => p.id !== req.params.id);
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
