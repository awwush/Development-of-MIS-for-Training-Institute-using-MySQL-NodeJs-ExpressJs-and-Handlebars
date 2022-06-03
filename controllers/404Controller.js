const page_not_found = (req,res) =>{
    res.render('404Page',{title : "404! not found"})
}


module.exports = page_not_found;