const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user =  await User.findOne({ email });
    console.log('check user', user);
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id));
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          { 
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list.",errCode:-1 });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list.",errCode:0 });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Error adding movie to the liked list",errCode:-2 });
  }
};

module.exports.getLikedMovies = async(req,res) =>{
  try{
      const {email} = req.params;
      const user = await User.findOne({email});
      if(user){
        res.json({msg:"success",movies: user.likedMovies});

      }else{
        res.json({msg:"Error fetching movie",email:email});
      }


  }catch(err){

  }
}
module.exports.removeFromLikedMovies = async (req,res) =>{
  try{
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." ,errCode:-2});
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies ,errCode:0});
    } else return res.json({ msg: "User with given email not found." ,errCode:-1});
  }catch(err){
    console.log(err);
    return res.json({msg:"err deleting movie"});
  }
}