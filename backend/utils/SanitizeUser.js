exports.sanitizeUser=(user)=>{
    return {_id:user._id,rollNo:user.rollNo,isVerified:user.isVerified,isAdmin:user.isAdmin}
}