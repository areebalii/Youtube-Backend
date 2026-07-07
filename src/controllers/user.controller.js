import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

export const registerUser = asyncHandler(async (req, res) => {
  // take the user data from the request body
  // validate the user data
  // check if the user already exists in the database
  // if user exists, return an error response
  // check for image and avatar
  // upload the image to cloudinary using the uploadOnCloudinary function from src/utils/cloudinary.js
  // create userObject with the user data and the image url from cloudinary
  // save the userObject to the database
  // remove the password from the userObject before sending the response
  // check user creation and return the response with the user data and a success message

  const { fullName, email, username, password } = req.body
  console.log(email)
  if (
    [fullName, email, password, username].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }]
  })

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400, "avatar file is required ")
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user")
  }

  res.status(201).json(
    new ApiResponse(201, createdUser, "User created successfully")
  )
})