const bcrypt = require('bcrypt')
const userModel = require('../models/user')
const jwt = require ( 'jsonwebtoken' )
const secret = '009dsf993nnsllIIhjew]]qnysahgdj'
function generateAccessToken (nickName) {
  return jwt.sign( nickName, secret, { expiresIn: '1800s'} )  

}
const signUp =  async (req, res) => {
  const { nickName, password, email } = req.body
console.log(req.body)
  if (nickName && password && email) {
    try {
      const hashPassword = await bcrypt.hash(password, 11)
      const newUser = await userModel.create({
        nickName,
        password: hashPassword,
        email,
      })
      const token = generateAccessToken({ nickName:newUser.nickName });
      console.log(token)
     return  res.json({newUser,token})
    } catch (error) {
      console.error(error.message)
      return res.sendStatus(500)
    }
  }

  return res.sendStatus(400)
}


const signIn = async (req, res) => {
  const { password, email } = req.body

  if (password && email) {
    try {
      const currentUser = await userModel.findOne({ email })
      if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
        const token = generateAccessToken({  nickName:currentUser.nickName  });
      console.log(token)
       return res.json({currentUser,token})

      }
      return res.sendStatus(401)
    } catch (error) {
      return res.sendStatus(500)
    }
  }

  return res.sendStatus(400)
}

const signOut = async (req, res) => {

    return res.sendStatus(200)
  
}



const checkAuth = async (req, res,next) => {
//   try {
//     const user = await userModel.findById(req.session.user.id, { password: 0 })
//     return res.json(user)
//   } catch (error) {
//     return res.sendStatus(500)
//   }
// }

const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(' ')[1]

 jwt.verify(token, secret, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  }) 


}





module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
}
