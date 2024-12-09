const log = (req, res, next) => {
    console.log(`Terjadi request ke ${req.path} pada method ${req.method}`);
    next();
}

module.exports = log