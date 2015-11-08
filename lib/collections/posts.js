Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument(userId,post),
	remove: ownsDocument(userId,post)
});

Posts.deny({
	update: function(userId,post,fieldNames){
		return (_.without(fieldNames,'url','title').length > 0);
	}
});