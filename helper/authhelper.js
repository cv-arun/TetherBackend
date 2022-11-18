const userModel = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../middleware/signJwt')

const authHelper = {

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {

            let user = await userModel.findOne({ email: userData.email })
            if (!user) {
                userData.password = userData.password ? await bcrypt.hash(userData.password, 10) : null

                userModel.create({
                    email: userData.email,
                    password: userData.password,
                    first_name: userData.fname,
                    last_name: userData.lname,
                    gender: userData.gender,
                    DOB: userData.dob,
                    picture: userData.picture

                }
                ).then((response) => {
                    console.log(response, 'response')
                    const user = {
                        userId: response._id,
                        name: response.first_name,
                        picture: response.picture
                    }

                    console.log(user, 'user')
                    resolve(user)
                }).catch(err => reject(err))
            } else {
                resolve({
                    msg: 'User Alredy Exist',
                    userId: user._id,
                    name: user.first_name,
                    picture: user.picture,
                    lastName: user.last_name,
                    DOB: user.DOB
                })
            }


        })

    },
    dologin: (loginData) => {
        console.log(loginData)
        return new Promise((resolve, reject) => {

            userModel.findOne({ email: loginData.email }).then((userData) => {

                if (userData) {
                    bcrypt.compare(loginData.password, userData.password, (err, res) => {
                        if (err) { reject(err) }
                        if (res) {

                            const user = {
                                user: {
                                    userId: userData._id,
                                    name: userData.first_name,
                                    lastName: userData.last_name,
                                    picture: userData.picture,
                                    bio: userData.details?.bio,
                                    DOB: userData.DOB
                                }
                            }
                            user.token = generateToken({
                                userId: userData._id,
                                email: userData.email
                            }, "2h")


                            resolve(user)

                        } else {
                            resolve({ msg: 'user not found' })
                        }
                    })
                } else {
                    resolve({ msg: 'user not found' })
                }

            }).catch(err => reject(err))
        })

    },
    doUpdateUser: (userData) => {
        return new Promise((resolve, reject) => {

        })
    },
    updatePassword: (userId, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user=await userModel.findById(userId)
              
              let match=await  bcrypt.compare(data.currentPassword, user.password)
            if(match){
                console.log(match,'match')
                let newPassword=await bcrypt.hash(data.newPassword,10)
                console.log(newPassword,'dagaaaaaaaaaaaaaaa')
                let result=await userModel.findByIdAndUpdate(userId,{password:newPassword})
                resolve({text:'password updated',color:'text-green-700'})

            }else{
                resolve({text:'enterd wrong credentials',color:'text-red-700'})
            }
               
            } catch (err) {
                reject(err)
            }
        })
    }


}

module.exports = authHelper