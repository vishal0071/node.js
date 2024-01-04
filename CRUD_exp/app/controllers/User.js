
const UserModel = require("../model/user")

exports.create = async (req, res) => {

    //console.log(req.body)
    if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.phone) {
        return res.status(400).json({ massage: "Content can not be empty " })
    };

    const user = new UserModel({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone
    })

    await user.save().then(data => {
        console.log(data)
        res.send({
            massage: "User created successfully",
            user: data
        })
    }).catch(err => {
        return res.status(500).json({ massage: err.massage })
    })

}


// get all user from Db 

exports.findAll = async (req, res) => {
    try {
        const users = await UserModel.find()
        // console.log(users);
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
};

// Find single user by ID 

exports.findOne = async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await UserModel.findById(req.params.id)
        if (!user) return res.status(404).json({ message: 'No user found ' })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server Error' })
    }

};


exports.update = async (req, res) => {
    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(result => {
            if (!result) {
                return res.status(404).send("No user with this id")
            } else {
                res.send({
                    message: "user Update successfully"
                })
            }
        }).catch(
            err => {
                console.log(err)
                res.status(500).send(err)
            }
        )

};

exports.delete = async (req, res) => {
    const user = await UserModel.findOneAndDelete(req.params.id).then(
        data => {
            if (!data) {
                res.status(404).send('user is not Found')
            } else {
                console.log(`Deleted user : ${data}`);
                res.status(200).json({ message: "User deleted Successfully" })
            }
        }
    ).catch(err => {
        res.status(500).send(err)
    })
}