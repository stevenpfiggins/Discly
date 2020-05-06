const router = require('express').Router();
const Disc = require('../models/disc.model');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const discs = await Disc.find().sort('speed');
    if (!discs) throw Error('Unable to find any discs.');

    res.status(200).json(discs);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const disc = await Disc.findById(req.params.id);
    if (!disc) throw Error('The disc with the given ID was not found.');

    res.status(200).json(disc);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

router.post('/', auth, async (req, res) => {
  const newDisc = new Disc({
    manufacturer: req.body.manufacturer,
    mold: req.body.mold,
    plastics: req.body.plastics,
    speed: req.body.speed,
    glide: req.body.glide,
    turn: req.body.turn,
    fade: req.body.fade,
  });

  try {
    const disc = await newDisc.save();
    if (!disc) throw Error('Unable to create disc.');

    res.status(201).json(disc);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const disc = await Disc.findByIdAndUpdate(
      req.params.id,
      {
        manufacturer: req.body.manufacturer,
        mold: req.body.mold,
        plastics: req.body.plastics,
        speed: req.body.speed,
        glide: req.body.glide,
        turn: req.body.turn,
        fade: req.body.fade,
      },
      {
        new: true,
      }
    );
    if (!disc) throw Error('The disc with the given ID was not found');

    res.status(200).json(disc);
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const disc = await Disc.findById(req.params.id);
    if (!disc) throw Error('The disc with the given ID was not found');

    const removed = await disc.remove();
    if (!removed) throw Error('The disc was unable to be deleted');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
