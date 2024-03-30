const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  
// find all categories
router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

 // find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!category) {
      res.status(404).json({msg:'No Category with that ID exists'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!category[0]) {
      res.status(404).json({msg:'No User with that ID exists'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({msg:'No Category with that ID exists'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

module.exports = router;
