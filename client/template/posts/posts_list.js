Template.postsList.helpers({
	posts: function(){
		return Posts.find({},{sort: {timestamp: -1}});
	}
});