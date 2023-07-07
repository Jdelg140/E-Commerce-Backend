const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    // find all tags
   const tags=await Tag.findAll({
     // be sure to include its associated Products
     include: [Product,ProductTag]
   })
   res.json(tags)
 }catch (err){
   console.error(err)
   res.status(500).json(err)
 }
});

router.get('/:id',async (req, res) => {
  
  try {
    // Find one tag by its `id` value
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product,ProductTag], // Include associated Products
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/',async (req, res) => {
  // create a new tag
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);

    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // Update a tag by its `id` value
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tag[0]) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    // Delete a tag by its `id` value
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
