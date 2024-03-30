const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [{ model: Product, through: ProductTag}]
  });
  res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id,{
      include: [{ model: Product, through: ProductTag}]
    });
    if (!tag) {
      res.status(404).json({msg:'No Tag with that ID exists'});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!tag[0]) {
      res.status(404).json({msg:'No Tag with that ID exists'});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({msg:'No Tag with that ID exists'});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({msg:'An error has occurred',err});
  }
});

module.exports = router;
