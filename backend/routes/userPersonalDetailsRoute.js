import express from 'express';
import authUser from '../middleware/auth.js';
import { createPersonalDetails  , getPersonalDetails} from '../controllers/userPersonalDetailsControllers.js';

const personalDetailsrouter = express.Router();


personalDetailsrouter.post("/createUserPersonalDetails" ,authUser, createPersonalDetails);
personalDetailsrouter.get("/getUserPersonalDetails" , authUser, getPersonalDetails);

export default personalDetailsrouter;