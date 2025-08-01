import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import Counter from '../module/counterSchema.js';
// import { makeBadge } from 'badge-maker';
const router = express.Router();
import { makeBadge, ValidationError } from 'badge-maker'

router.post('/', async (req, res) => {
    const { url, initialCounter = 0 } = req.body;
    const slug = uuidv4().slice(0, 8);
    const counter = new Counter({ url, count: initialCounter, slug });
    await counter.save();
    res.status(201).json({
        slug, badgeMarkdown: `[![Profile Views](${process.env.BASE_URL}/api/counters/${slug}/badge)](${url})`

    })
})

router.get('/:slug/visit', async (req, res) => {
    const c = await Counter.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { count: 1 } },
        { new: true }
    );
    if (!c) return res.status(404).json({ error: 'Not found' });
    res.json({ count: c.count });
});

router.get('/:slug/badge', async (req, res) => {

    const c = await Counter.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { count: 1 } },
        { new: true }
    );
    if (!c) return res.status(404).send('Not found');


    const svg = makeBadge({
        label: 'views',
        message: String(c.count),
        color: 'blue',
        style: 'flat-square'
    });

    res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.send(svg);
});


export default router;
