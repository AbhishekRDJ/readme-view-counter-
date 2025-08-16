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

    const badgeUrl = `${process.env.BASE_URL}/api/counters/${slug}/badge?label=Total%20Views&color=0e75b6&style=for-the-badge&cache_bust=${Date.now()}`;

    const htmlSnippet = `<a href="${url}">
  <img src="${badgeUrl}" alt="Total Views Badge">
</a>`;

    res.status(201).json({
        slug,
        badgeUrl,
        htmlSnippet
    });
});


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

    const label = req.query.label || 'views';
    const color = req.query.color || 'blue';
    const style = req.query.style || 'flat-square';

    const svg = makeBadge({
        label,
        message: String(c.count),
        color,
        style
    });

    res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8');

    // Prevent all caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    res.send(svg);
});



export default router;
