// Slightly different than our privateRouter, which checks for admin rather than user

module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }
    next();
};