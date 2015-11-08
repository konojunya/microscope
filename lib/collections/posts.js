Posts = new Meteor.Collection('posts');

Posts.allow({
<<<<<<< HEAD
	update: function(userId,post){
		return ownsDocument(userId,post);
	}
	remove: function(userId,post){
		return ownsDocument(userId,post);
	}
=======
	update: ownsDocument(userId,post),
	remove: ownsDocument(userId,post)
>>>>>>> parent of 1b63d98... とりま動く allowとdenyでupdateとremoveを管理
});

Posts.deny({
	update: function(userId,post,fieldNames){
		return (_.without(fieldNames,'url','title').length > 0);
	}
});