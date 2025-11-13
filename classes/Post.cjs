class post{
    constructor(picture, text, likes = 0, comments = [], date, author, togetherwith = [], hashtags = [] ) 
{       
        this.picture = picture;
        this.text = text;
        this.likes = likes;
        this.comments = comments;
        this.date = date;
        this.author = author;
        this.togetherwith = togetherwith;
        this.hashtags = hashtags;
    }
}