module.exports.register = async (req, res, next) => {
    const {fullName, email, username, password } = req.body;

    res.send({
        fullName, email, username, password
    })
}