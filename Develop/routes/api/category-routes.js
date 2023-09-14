const router = require('express').Router();
const {Category} = require('../../models');
const {Product} = require('../../models');

//(500).STATUS ERROR
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [ Product ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// (500).STATUS ERROR
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(res.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// WORKS!
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// WORKS!
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// WORKS!
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
